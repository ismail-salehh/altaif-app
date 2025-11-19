// import { GoogleGenerativeAI } from '@google/generative-ai';
// //const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// import textToSpeech from '@google-cloud/text-to-speech';
// import fs from 'fs';
// import path from 'path';
// import { Storage } from '@google-cloud/storage';

// const ttsClient = new textToSpeech.TextToSpeechClient();
// import storyGen from '../utils/storyGenerationPrompts.js';

// // @desc Generate story from game answers
// // @route POST /api/story/generate
// const generateStory = async (req, res) => {
//   try {
//     const { answers } = req.body;

//     if (!answers || !Array.isArray(answers)) {
//       return res.status(400).json({ message: 'No answers provided' });
//     }

//     // Step 1: Generate story text (split into 4-6 paragraphs/scenes)
//     //const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const storyPrompt = storyGen.storyPrompt(answers); // From utils
//     //const storyResult = await model.generateContent(storyPrompt);
//     //const storyText = storyResult.response.text().trim();

//     const paragraphs = storyText.split('\n\n').slice(0, 6); // Up to 6 scenes

//     // Step 2: Generate images for each paragraph
//     const scenes = [];
//     for (let i = 0; i < paragraphs.length; i++) {
//       const imagePrompt = storyGen.imagePrompt(paragraphs[i], answers, i + 1);
//       const imageResult = await model.generateContent(imagePrompt, {
//         generationConfig: { responseMimeType: 'image/png', candidateCount: 1 }, // Single high-quality
//       });
//       const imageBytes = await imageResult.response.imageData(); // Base64 or buffer
//       scenes.push({
//         imageUrl: `data:image/png;base64,${imageBytes.toString('base64')}`, // Inline for frontend
//         text: paragraphs[i],
//       });
//     }

//     // Step 3: Generate TTS audio
//     const audioRequest = {
//       input: { text: storyText },
//       voice: { languageCode: 'ar-SA', name: 'ar-SA-Standard-A' }, // Arabic voice
//       audioConfig: { audioEncoding: 'MP3' },
//     };
//     const [audioResponse] = await ttsClient.synthesizeSpeech(audioRequest);
//     const audioPath = path.join(__dirname, '../temp/story-audio.mp3');
//     fs.writeFileSync(audioPath, audioResponse.audioContent, 'binary');
//     const audioUrl = `/assets/story/story-audio.mp3`; // Serve via static in server.js

//     res.json({ storyText, scenes, audioUrl });
//   } catch (err) {
//     console.error('Story gen error:', err);
//     res.status(500).json({ message: 'Failed to generate story' });
//   }
// };

// export default { generateStory };