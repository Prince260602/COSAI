const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyC7_7n-DxgKgb_3pXR_yqvKz4P2qePhq7Q");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function askGemini(question) {
  try {
    const response = await model.generateContent(question);
    if (response && response.response && response.response.text) {
      return response.response.text();
    } else {
      throw new Error("Invalid response structure from Gemini AI");
    }
  } catch (error) {
    console.error("Error interacting with Gemini AI:", error);
    throw new Error(error.message || "Failed to get an answer from Gemini AI");
  }
}

module.exports = { askGemini };
