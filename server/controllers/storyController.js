import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import {
  storyPrompt,
  imagePrompt,
  splitIntoScenes,
} from "../utils/storyGen.js";
import dotenv from "dotenv";

dotenv.config();

const useLocalModel = process.env.USE_LOCAL_MODEL === "true";

/* ---------------- GEMINI ---------------- */

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const STORY_MODEL = "gemini-2.5-flash";

/* ---------------- OPENAI (AUDIO ONLY) ---------------- */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ---------------- TRANSLATION ---------------- */

async function translatePrompt(arabicPrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [{ role: "user", parts: [{ text: arabicPrompt }] }],
    config: {
      systemInstruction:
        "Translate Arabic image prompt into concise, high-quality English. Return only the prompt.",
      maxOutputTokens: 300,
    },
  });

  return response.text?.trim() || "A cute cartoon illustration.";
}

/* ---------------- IMAGE (POLLINATIONS) ---------------- */

function generateImage(promptEn) {
  const seed = Math.floor(Math.random() * 100000);

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(
    promptEn
  )}?width=1280&height=720&seed=${seed}&model=flux`;
}

/* ---------------- AUDIO (OPENAI TTS) ---------------- */

async function generateAudio(arabicText) {
  const response = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts", // cheap, supports Arabic
    voice: "alloy",
    input: arabicText,
    format: "mp3",
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  const base64Audio = buffer.toString("base64");

  return `data:audio/mpeg;base64,${base64Audio}`;
}

/* ================= CONTROLLER ================= */

export const generateStory = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: "No answers provided" });
    }

    /* ---------- STORY ---------- */

    const prompt = storyPrompt(answers);
    let storyText;

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

    if (!storyText) throw new Error("Empty story");

    /* ---------- SCENES ---------- */

    const sceneTexts = splitIntoScenes(storyText, 5);
    const scenes = [];

    for (let i = 0; i < sceneTexts.length; i++) {
      const paragraph = sceneTexts[i];

      const imgPromptAr = imagePrompt(paragraph, answers, i + 1);
      const imgPromptEn = await translatePrompt(imgPromptAr);

      const imageUrl = generateImage(imgPromptEn);
      const audioUrl = await generateAudio(paragraph);

      scenes.push({
        paragraph,
        imageUrl,
        audioUrl,
      });
    }

    return res.json({
      success: true,
      storyText,
      scenes,
    });
  } catch (err) {
    console.error("Story error:", err);
    return res.status(500).json({
      message: "Story generation failed",
      error: String(err),
    });
  }
};
