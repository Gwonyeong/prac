const express = require("express");
const router = express.Router();
const searchRouter = require("./serchRouter")

router.use("/search", searchRouter)

module.exports = router;
