// server/controllers/storyController.js
import OpenAI from "openai";
import { storyPrompt, imagePrompt } from "../utils/storyGen.js"; // adjust path if different

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateStory = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: "No answers provided" });
    }

    const prompt = storyPrompt(answers);

    // Use Responses or Chat Completions depending on SDK; below uses chat-like call
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    });

    const storyText = response.choices?.[0]?.message?.content?.trim();
    if (!storyText) {
      return res.status(500).json({ message: "Empty story from model" });
    }

    const paragraphs = storyText
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 8); // keep sane limit

    const scenes = paragraphs.map((p, i) => ({
      paragraph: p,
      prompt: imagePrompt(p, answers, i + 1),
    }));

    return res.json({ success: true, storyText, scenes });
  } catch (err) {
    console.error("Story generate error:", err);
    return res.status(500).json({ message: "Story generation failed", error: String(err) });
  }
};
