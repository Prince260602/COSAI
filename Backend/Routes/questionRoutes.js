const express = require("express");
const { askQuestion } = require("../Controllers/questionController.js");

const router = express.Router();


router.post("/ask", askQuestion);

module.exports = router;
