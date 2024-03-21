describe("로그인 테스트", () => {
    beforeEach(() => {
        // given - 홈페이지 화면에 접근 한다.
        cy.visit("http://localhost:3000");
        cy.intercept({method:"POST", url: "https://accounts.spotify.com/api/token"},{
            "access_token": Cypress.env("access_token"),
            "token_type": "Bearer",
            "expires_in": 3600
        })
        cy.intercept({method:"GET", url: "https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/ADMIN_LIKES?select=contents_id&order=liked_at.desc&limit=10"},{fixture:"homepage/supabase_admin_response.json"})
        cy.intercept({method:"GET", url: "https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/LIKES?select=contents_id&order=liked_at.desc&limit=10"},{fixture:"homepage/supabase_response.json"})
        cy.intercept({method:"GET", url: "https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/LIKES?select=contents_id&order=liked_at.desc&limit=10"},{fixture:"homepage/supabase_response.json"})
        cy.intercept({method:"GET", url : "https://api.spotify.com/v1/tracks/?ids=6luBKkFUt5wTwz7hpLhp12,4AFsRbaLKRWo3dDtjDFA2V,3P8LJzc8QBtHqmLQCyoCQe,3iVcZ5G6tvkXZkZKlMpIUs,0POWf265mo16skF8KwzIMn,3xKsf9qdS1CyvXSMEid6g8,7DfFc7a6Rwfi3YQMRbDMau,5GKwq4sO5ZHKuWaDmdwMQc,1SmwJJ8YVgiXtyE6elhUx1,5HshJOG3lOUEZinx0I3vXf"}, {fixture : "homepage/onlyTrackData.json"})
        cy.intercept({method:"GET", url : "https://api.spotify.com/v1/tracks/?ids=01MoBCPgZHsOPYwMJxc9Qo,1G8ZiodFtDX5tNHwvxcllW,3ZMPl8BrHqX0erYjqWiZ0c,7tr2za8SQg2CI8EDgrdtNl,74g2fPpMSMMH3DinOoTWUB,3UZSpAlc0WZjxkfbUBdUgT,4vLYewWIvqHfKtJDk8c8tq,2oCJgHbwGnYAKXenorXMpW,5DG1ux5rYimpUxMPh2HQcz,6f5c2TrHJxscSjX1CVFlfR"}, {fixture : "homepage/trackData.json"})
    })
    it("좋아요 누르기", () => {
        cy.intercept({method:"GET", url:"https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/LIKES?select=*&contents_id=eq.6luBKkFUt5wTwz7hpLhp12"}, [])
        cy.get("[data-cy=music-card-6luBKkFUt5wTwz7hpLhp12]").should("be.visible").as("noAudioCard")
        cy.get("@noAudioCard").click();
        cy.get("[data-cy=likeBtn_6luBKkFUt5wTwz7hpLhp12]").should("be.visible").click()

    })
})