const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCtfFd0PsQM4IjLiyKKr2bt3g2tb_ehnpo");

exports.symptomCheck = functions.https.onRequest(async (req, res) => {
  const { symptoms } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `User is feeling: ${symptoms}. Give likely diagnosis, urgency level, and next steps.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.send({ response: text });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});  
