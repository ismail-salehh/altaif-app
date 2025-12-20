// server/controllers/storyController.js
import { GoogleGenAI } from "@google/genai"; // 1. Import GoogleGenAI
import { storyPrompt, imagePrompt } from "../utils/storyGen.js"; // adjust path if different

// 2. Initialize the Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // Make sure you use GEMINI_API_KEY in your .env
});

// A good model for fast text generation like story paragraphs
const STORY_MODEL = "gemini-2.5-flash-lite";
// const IMAGE_DIR = path.join(process.cwd(), "client", "public", "story_images");

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
        maxOutputTokens: 2000,
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
      .filter(Boolean)
      .slice(0, 5); // keep sane limit

    // 2. Generate Image Prompts & Structures
    const scenes = paragraphs.map((p, i) => ({
      paragraph: p,
      prompt: imagePrompt(p, answers, i + 1),
      imageUrl: null, // Placeholder for the final URL
    }));

    // 3. GENERATE IMAGES FOR EACH SCENE
    // await fs.mkdir(IMAGE_DIR, { recursive: true });
    // 3. CONSTRUCT IMAGE URLs (No downloading needed!)

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];

      // Translate the prompt
      const englishPrompt = await translatePrompt(scene.prompt, ai);

      // Create a random seed to ensure the image stays the same if they refresh
      const seed = Math.floor(Math.random() * 10000);

      // Construct the URL directly.
      // The frontend will load this URL inside the <img src="..." /> tag.
      scene.imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        englishPrompt
      )}?width=1280&height=720&model=flux&seed=${seed}`;

      console.log(`[Scene ${i + 1}] Image URL ready: ${scene.imageUrl}`);
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
