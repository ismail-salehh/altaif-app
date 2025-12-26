// server/controllers/storyController.js
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import {
  storyPrompt,
  imagePrompt,
  splitIntoScenes,
} from "../utils/storyGen.js";
import dotenv from "dotenv";
dotenv.config();

// detect local usage
const useLocalModel = process.env.USE_LOCAL_MODEL === "true";

// Gemini client (used for translation + images always)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const STORY_MODEL = "gemini-2.5-flash";

async function translatePrompt(arabicPrompt, ai) {
  const translationSystemInstruction = `You are a professional language translator. Your sole task is to take the provided Arabic text, which is an image prompt, and translate it into a concise, detailed, high-quality English image prompt. Do not add any conversational text, explanations, or formatting. Only return the English prompt text.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [
      {
        role: "user",
        parts: [{ text: arabicPrompt }],
      },
    ],
    config: {
      systemInstruction: translationSystemInstruction,
      maxOutputTokens: 2500,
    },
  });

  return response.text?.trim() || "A cute cartoon illustration.";
}

export const generateStory = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: "No answers provided" });
    }

    const prompt = storyPrompt(answers);
    let storyText;

    // ===============================
    // 1. STORY GENERATION (ONLY PART THAT CHANGES)
    // ===============================
    if (useLocalModel) {
      console.log("Using LOCAL model for story generation");

      const localRes = await axios.post(
        `${process.env.LOCAL_AI_URL}/generate`,
        { prompt }
      );

      storyText = localRes.data?.story;
      console.log(storyText);
    } else {
      console.log("Using GEMINI for story generation");

      const response = await ai.models.generateContent({
        model: STORY_MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          maxOutputTokens: 2000,
        },
      });

      storyText = response.text?.trim();
    }

    if (!storyText) {
      return res.status(500).json({ message: "Empty story from model" });
    }
    console.log(storyText);

    // ===============================
    // 2. Scenes GENERATION (UNCHANGED)
    // ===============================
    const sceneTexts = splitIntoScenes(storyText, 5);

    const scenes = sceneTexts.map((p, i) => ({
      paragraph: p,
      prompt: imagePrompt(p, answers, i + 1),
      imageUrl: null,
    }));

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const englishPrompt = await translatePrompt(scene.prompt, ai);
      const seed = Math.floor(Math.random() * 10000);

      scene.imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        englishPrompt
      )}?width=1280&height=720&model=flux&seed=${seed}`;
    }

    return res.json({ success: true, storyText, scenes });
  } catch (err) {
    console.error("Story generate error:", err);
    return res.status(500).json({
      message: "Story generation failed",
      error: String(err),
    });
  }
};
