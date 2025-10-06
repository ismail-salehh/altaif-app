import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: String,
    createdAt: { type: Date, default: Date.new },
});

export default mongoose.model("Story", storySchema);