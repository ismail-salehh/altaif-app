// server/controllers/storyController.js
import { GoogleGenAI } from "@google/genai"; // 1. Import GoogleGenAI
import { storyPrompt, imagePrompt } from "../utils/storyGen.js"; // adjust path if different
import fs from "fs/promises"; // 👈 For file saving
import path from "path"; // 👈 For resolving paths
import axios from "axios"; // 👈 For HTTP requests

// 2. Initialize the Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // Make sure you use GEMINI_API_KEY in your .env
});

// A good model for fast text generation like story paragraphs
const STORY_MODEL = "gemini-2.0-flash";
const IMAGE_MODEL = "imagen-3.0-generate-002"; // 👈 The correct Image Model
const IMAGE_DIR = path.join(process.cwd(), "client", "public", "story_images");

async function translatePrompt(arabicPrompt, ai) {
  const translationSystemInstruction = `You are a professional language translator. Your sole task is to take the provided Arabic text, which is an image prompt, and translate it into a concise, detailed, high-quality English image prompt. Do not add any conversational text, explanations, or formatting. Only return the English prompt text.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // Use the fast model for translation
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

  console.log("translated story:", response.text?.trim());

  return response.text?.trim() || "A cute cartoon illustration.";
}

export const generateStory = async (req, res) => {
  try {
    const { answers } = req.body;
    console.log(answers);
    if (!answers) {
      return res.status(400).json({ message: "No answers provided" });
    }

    const prompt = storyPrompt(answers);

    // 1. Generate Story Text
    const response = await ai.models.generateContent({
      model: STORY_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        maxOutputTokens: 2500,
      },
    });
    console.log(response);
    const storyText = response.text?.trim(); // 4. Access the response text directly

    if (!storyText) {
      return res.status(500).json({ message: "Empty story from model" });
    }

    const paragraphs = storyText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean).slice(0, 2); // keep sane limit

    // 2. Generate Image Prompts & Structures
    const scenes = paragraphs.map((p, i) => ({
      paragraph: p,
      prompt: imagePrompt(p, answers, i + 1),
      imageUrl: null, // Placeholder for the final URL
    }));

    // 3. GENERATE IMAGES FOR EACH SCENE
    await fs.mkdir(IMAGE_DIR, { recursive: true });

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];

      // OPTIONAL: Translate prompt if you want, but Pollinations understands basic Arabic/English mixed.
      // It's still safer to use your englishPrompt logic.
      const englishPrompt = await translatePrompt(scene.prompt, ai);

      console.log(`[Scene ${i + 1}] Generating image via Pollinations...`);

      // Create a unique filename
      const filename = `story_scene_${Date.now()}_${i}.jpeg`;
      const filePath = path.join(IMAGE_DIR, filename);

      try {
        // Pollinations URL structure: https://image.pollinations.ai/prompt/{encodedPrompt}
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
          englishPrompt
        )}?width=1280&height=720&model=flux`;

        // Fetch the image as a stream/buffer
        const response = await axios({
          method: "GET",
          url: imageUrl,
          responseType: "arraybuffer", // Important for images
        });

        // Save file
        await fs.writeFile(filePath, response.data);

        // Set public URL
        scene.imageUrl = `/story_images/${filename}`;
      } catch (imgErr) {
        console.error(`Error generating image for scene ${i}:`, imgErr.message);
        // Fallback placeholder if generation fails
        scene.imageUrl = "/images/placeholder.jpg";
      }
    }

    return res.json({ success: true, storyText, scenes });
  } catch (err) {
    console.error("Story generate error:", err);
    // Note: The Gemini SDK uses the status from the API call, so you might want
    // to check err.status for more specific handling in a production app.
    return res
      .status(500)
      .json({ message: "Story generation failed", error: String(err) });
  }
};
