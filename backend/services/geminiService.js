import axios from "axios";

export const generateGeminiResponse = async (message) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }
    );

    return (
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response"
    );
  } catch (error) {
    console.log("Gemini Error:", error.response?.data || error.message);
    return "AI service error";
  }
};