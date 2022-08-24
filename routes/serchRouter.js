const express = require("express");
const searchController = require("../controllers/searchController");
const router = express.Router();
//게시물 전체 조회
router.get("/", searchController.crawlingMusinsa);

module.exports = router;