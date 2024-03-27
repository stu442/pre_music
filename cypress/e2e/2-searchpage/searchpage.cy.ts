describe("검색 페이지 요소 확인하기", () => {
    beforeEach(() => {
        // given - 검색 페이지 화면에 접근 한다.
        cy.visit("http://localhost:3000/search?keyword=%EC%95%88%EB%85%95");
        cy.intercept({method:"POST", url: "https://accounts.spotify.com/api/token"},{
            "access_token": Cypress.env("access_token"),
            "token_type": "Bearer",
            "expires_in": 3600
        })
        cy.intercept({method:"GET", url:"https://api.spotify.com/v1/search/?q=%EC%95%88%EB%85%95&type=track"},{fixture:"searchpage/trackData.json"})
    }
        )
        it("검색 페이지 요소 확인하기", () => {
            // when - 첫 번째 음악 카드를 눌렀을 때
            cy.get("[data-cy=music-card-7sZwWzSeCtGYo5ZQcWRLlJ]").should("be.visible").as('first_album')
            cy.intercept({method:"GET", url:"https://yzxeirrpyitzfbkwddhe.supabase.co/rest/v1/LIKES?select=*&contents_id=eq.7sZwWzSeCtGYo5ZQcWRLlJ"}, [])
            cy.get("@first_album").click()
            // then - 모달이 잘 작동한다.
            cy.get("[data-cy=music-card-7sZwWzSeCtGYo5ZQcWRLlJ]")
            cy.get("[data-cy=audio-btn-7sZwWzSeCtGYo5ZQcWRLlJ]").as('audioBtn')
            // when - 사진을 클릭 했을 때
            cy.get("@audioBtn").click({force: true});
            // then - 음소거 토글이 잘 된다.
            cy.get("[data-cy=audio-off-7sZwWzSeCtGYo5ZQcWRLlJ]")
            cy.get("@audioBtn").click({force: true});
            cy.get("[data-cy=audio-on-7sZwWzSeCtGYo5ZQcWRLlJ]")
            cy.get("@audioBtn").click({force: true});
            cy.get("[data-cy=audio-off-7sZwWzSeCtGYo5ZQcWRLlJ]")
        })
        it("무한 스크롤 테스트 : 페이지 하단으로 이동했을 때, API 요청을 해서 요소들을 잘 렌더링 시킨다.", () => {
            // when - 페이지 최하단으로 이동했을 때,
            cy.scrollTo("bottom")
            // then - API 요청을 해서, 추가적인 요소들을 잘 렌더링 시킨다.
            cy.intercept({method:"GET", url:"https://api.spotify.com/v1/search?query=%EC%95%88%EB%85%95&type=track&locale=ko-KR%2Cko%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=20&limit=20"},{fixture:"searchpage/moreTrackData.json"})
            cy.get("[data-cy=music-card-6e4O9sIAzshDWAt8bUM30O]").should("be.visible")
        })
    })