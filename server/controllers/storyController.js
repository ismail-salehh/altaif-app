// server/controllers/storyController.js
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { storyPrompt, imagePrompt } from "../utils/storyGen.js";

const useLocalModel = process.env.USE_LOCAL_MODEL === "true";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const STORY_MODEL = "gemini-2.0-flash-lite";

async function translatePrompt(arabicPrompt, ai) {
  const translationSystemInstruction = `You are a professional language translator. Your sole task is to take the provided Arabic text, which is an image prompt, and translate it into a concise, detailed, high-quality English image prompt. Do not add any conversational text, explanations, or formatting. Only return the English prompt text.`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [{role: "user",parts: [{ text: arabicPrompt }]}],
    config: {
      systemInstruction: translationSystemInstruction,
      maxOutputTokens: 500,
    },
  });
  console.log('story translated')
  return response.text?.trim() || "A cute cartoon illustration.";
}

export const generateStory = async (req, res) => {
  try {
    const { answers } = req.body;
    console.log(answers);
    if (!answers) {
      return res.status(400).json({ message: "No answers provided" });
    }

    // 1. Build Prompt
    const prompt = storyPrompt(answers);
    let storyText;
    let englishStoryText;
    let source;

    // 2. local model option
    if (useLocalModel) {
      console.log("Using LOCAL model");
      const localRes = await axios.post(
        `${process.env.LOCAL_AI_URL}/generate`,
        { prompt }
      );

      storyText = localRes.data?.story;
      source = "LOCAL_MODEL";
    }
    // 3. Using Gemini
    else {
      const response = await ai.models.generateContent({
        model: STORY_MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          maxOutputTokens: 2000,
        },
      });

      storyText = response.text?.trim();
      source = "GEMINI";

      if (!storyText) return res.status(500).json({ message: "Empty story from model" });
      console.log('story generated')
    }
    console.log('story not generated')
    englishStoryText = await translatePrompt(storyText, ai);
    
    // 4. Split into paragraphs
    const paragraphs = storyText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 5);

    const englishParagraphs = englishStoryText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 5);

    // 5. Build scenes with prompts
    const scenes = englishParagraphs.map((p) => ({
      paragraph: p.split(" ").slice(0, 15).join(" "),
      prompt: imagePrompt(p),
      imageUrl: null,
    }));

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const seed = Math.floor(Math.random() * 10000); // Random seed for consistent image generation
      scene.imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(scene.prompt)}?width=1280&height=720&model=flux&seed=${seed}`;
    }
    return res.json({ success: true, storyText, paragraphs });
  } catch (err) {
    console.error("Story generate error:", err);
    return res
      .status(500)
      .json({ message: "Story generation failed", error: String(err) });
  }
};