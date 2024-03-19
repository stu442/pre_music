describe("홈페이지 요소 확인하기", () => {
    beforeEach(() => {
        // given - 홈페이지 화면에 접근 한다.
        cy.visit("http://localhost:3000");
        cy.intercept({method:"POST", url: "https://accounts.spotify.com/api/token"},{fixture:"homepage/token.json"})
        cy.intercept({method:"GET", url: "https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/ADMIN_LIKES?select=contents_id&order=liked_at.desc&limit=10"},{fixture:"homepage/supabase_admin_response.json"})
        cy.intercept({method:"GET", url: "https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/LIKES?select=contents_id&order=liked_at.desc&limit=10"},{fixture:"homepage/supabase_response.json"})
        cy.intercept({method:"GET", url: "https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/LIKES?select=contents_id&order=liked_at.desc&limit=10"},{fixture:"homepage/supabase_response.json"})
        cy.intercept({method:"GET", url : "https://api.spotify.com/v1/tracks/?ids=6luBKkFUt5wTwz7hpLhp12,4AFsRbaLKRWo3dDtjDFA2V,3P8LJzc8QBtHqmLQCyoCQe,3iVcZ5G6tvkXZkZKlMpIUs,0POWf265mo16skF8KwzIMn,3xKsf9qdS1CyvXSMEid6g8,7DfFc7a6Rwfi3YQMRbDMau,5GKwq4sO5ZHKuWaDmdwMQc,1SmwJJ8YVgiXtyE6elhUx1,5HshJOG3lOUEZinx0I3vXf"}, {fixture : "homepage/onlyTrackData.json"})
        cy.intercept({method:"GET", url : "https://api.spotify.com/v1/tracks/?ids=01MoBCPgZHsOPYwMJxc9Qo,1G8ZiodFtDX5tNHwvxcllW,3ZMPl8BrHqX0erYjqWiZ0c,7tr2za8SQg2CI8EDgrdtNl,74g2fPpMSMMH3DinOoTWUB,3UZSpAlc0WZjxkfbUBdUgT,4vLYewWIvqHfKtJDk8c8tq,2oCJgHbwGnYAKXenorXMpW,5DG1ux5rYimpUxMPh2HQcz,6f5c2TrHJxscSjX1CVFlfR"}, {fixture : "homepage/trackData.json"})
    })
    it("홈페이지 음악 카드 클릭과 오디오 버튼 동작 확인", () => {
        // when - 특정 음악 카드를 클릭했을 때
        cy.contains('주인장 추천 음악')
        cy.contains('회원님들의 픽') 
        cy.contains('최근 좋아요 받은 음악') 
        cy.get("[data-cy=music-card-4AFsRbaLKRWo3dDtjDFA2V]").should("be.visible").as("musicCard")
        cy.intercept({method:"GET", url: "https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/LIKES?select=*&contents_id=eq.4AFsRbaLKRWo3dDtjDFA2V"}, [])
        cy.get("@musicCard").click();
        // then - 오디오가 없다는 오류가 없다.
        cy.get("[data-cy=toast_1]").should("not.exist")
        // then - 사진의 src 속성이 잘 있다.
        cy.get("[data-cy=music-modal-4AFsRbaLKRWo3dDtjDFA2V]").should("have.attr", "src")
        cy.get("[data-cy=music-card-4AFsRbaLKRWo3dDtjDFA2V]")
        cy.get("[data-cy=audio-btn-4AFsRbaLKRWo3dDtjDFA2V]").as('audioBtn')
        // when - 사진을 클릭 했을 때
        cy.get("@audioBtn").click({force: true});
        // then - 음소거 토글이 잘 된다.
        cy.get("[data-cy=audio-off-4AFsRbaLKRWo3dDtjDFA2V]")
        cy.get("@audioBtn").click({force: true});
        cy.get("[data-cy=audio-on-4AFsRbaLKRWo3dDtjDFA2V]")
        cy.get("@audioBtn").click({force: true});
        cy.get("[data-cy=audio-off-4AFsRbaLKRWo3dDtjDFA2V]")
    });
    it("오디오가 없는 모달을 누르면 오디오가 없다는 오류가 나온다.", () => {
        // when - 음악 카드를 클릭했을 때
        cy.get("[data-cy=music-card-6luBKkFUt5wTwz7hpLhp12]").should("be.visible").as("noAudioCard")
        cy.get("@noAudioCard").click();
        // then - 오디오가 없는 모달을 누르면 오디오가 없다는 오류가 나온다.
        cy.get("[data-cy=toast_1]").should("be.visible").as("toast")
        cy.get("@toast").find(":last-child").invoke("text").should("eq", "음악이 존재하지 않습니다.")
    })
});