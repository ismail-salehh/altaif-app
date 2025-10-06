import mongoose from 'mongoose';

const gameDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    choices: [String],
});

export default mongoose.model("GameData", gameDataSchema);