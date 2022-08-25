const searchService = require("../services/searchService.js")

const crawlingMusinsa = async(req,res,next) => {
    const {keyword} = req.query;
    const data = await searchService.crawlingMusinsa(keyword);
    
    return res.status(200).json({
        data
    })
}

module.exports = {
    crawlingMusinsa
}