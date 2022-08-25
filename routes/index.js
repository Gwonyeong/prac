const express = require("express");
const router = express.Router();
const searchRouter = require("./serchRouter")
const authRouter = require("./authRouter")

router.use("/search", searchRouter)
router.use('/auth', authRouter);

module.exports = router;
