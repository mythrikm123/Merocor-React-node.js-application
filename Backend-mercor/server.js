const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = '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';
const MODEL_NAME = 'gpt-3.5-turbo';

const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

const simulateAudioTranscription = async (audio) => {
  return 'Transcribed text from audio...';
};

app.post('/generate-response', async (req, res) => {
  const { audio } = req.body;
  try {
    const transcribedText = await simulateAudioTranscription(audio);
    const prompt = 'Transcribed text from audio: ' + transcribedText;
    const response = await generateLLMResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the audio.' });
  }
});

const generateLLMResponse = async (prompt) => {
  try {
    const response = await openai.Completion.create({
      engine: MODEL_NAME,
      prompt,
      max_tokens: 100,  
      apiKey: OPENAI_API_KEY,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    throw new Error('An error occurred while generating the response.');
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
