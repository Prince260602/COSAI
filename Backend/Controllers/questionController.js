const { askGemini } = require("../Config/geminiController.js");

async function askQuestion(req, res) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  try {
    const answer = await askGemini(question); 
    res.json({ question, answer });
  } catch (error) {
    console.error("Error occurred while fetching the answer:", error.message);
    res.status(500).json({
      message: "Error occurred while fetching the answer",
      error: error.message,
    });
  }
}

module.exports = { askQuestion };
