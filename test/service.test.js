const {crawlingMusinsa} = require("../services/searchService")

describe("crawlingMusinga", () => {
    const keyword = "후드티";

    /**
         * 후드티로 검색
         */
    test("크롤링 완료 후 받는 90개(첫 페이지가 90개)", async() => {
        expect(await (await crawlingMusinsa(keyword)).length).toBe(90)
    } )
})