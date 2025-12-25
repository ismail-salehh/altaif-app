// server/controllers/storyController.js
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { storyPrompt, imagePrompt } from "../utils/storyGen.js";

const useLocalModel = process.env.USE_LOCAL_MODEL === "true";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const STORY_MODEL = "gemini-2.0-flash-lite";

/**
 * Translate Arabic text to English (used for image prompts)
 */
async function translateToEnglish(arabicText) {
  const systemInstruction = `
You are a professional translator.
Translate the given Arabic text into concise, descriptive English.
Do not add explanations, formatting, or commentary.
Return only the translated text.
`;

  const response = await ai.models.generateContent({
    model: STORY_MODEL,
    contents: [
      {
        role: "user",
        parts: [{ text: arabicText }],
      },
    ],
    config: {
      systemInstruction,
      maxOutputTokens: 300,
    },
  });

  return response.text?.trim();
}

export const generateStory = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: "No answers provided" });
    }

    // 1. Build story prompt
    const prompt = storyPrompt(answers);

    let storyText;

    // 2. Generate story (LOCAL or GEMINI)
    if (useLocalModel) {
      const localRes = await axios.post(
        `${process.env.LOCAL_AI_URL}/generate`,
        { prompt }
      );
      storyText = localRes.data?.story;
    } else {
      const response = await ai.models.generateContent({
        model: STORY_MODEL,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { maxOutputTokens: 2000 },
      });
      storyText = response.text?.trim();
    }

    if (!storyText) {
      return res.status(500).json({ message: "Empty story from model" });
    }

    // 3. Split Arabic story into scenes FIRST
    const arabicScenes = storyText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 5);

    // 4. Translate scenes (Arabic → English)
    const translatedScenes = [];
    for (const scene of arabicScenes) {
      const translated = await translateToEnglish(scene);
      translatedScenes.push(translated || "");
    }

    // 5. Build final scene objects
    const scenes = arabicScenes.map((arabicText, index) => {
      const englishText = translatedScenes[index];
      const shortPrompt = englishText
        ?.split(" ")
        .slice(0, 15)
        .join(" ");

      const seed = Math.floor(Math.random() * 10000);

      return {
        paragraph: arabicText,
        imagePrompt: imagePrompt(englishText),
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(
          shortPrompt
        )}?width=1280&height=720&model=flux&seed=${seed}`,
      };
    });

    // 6. Response
    return res.json({
      success: true,
      storyText,
      scenes,
    });
  } catch (err) {
    console.error("Story generation error:", err);
    return res.status(500).json({
      message: "Story generation failed",
      error: String(err),
    });
  }
};