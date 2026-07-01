import mongoose from 'mongoose';

const gameDataSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  choices: [{ type: String, trim: true }],
}, { timestamps: true });

gameDataSchema.index({ userId: 1 });

export default mongoose.model('GameData', gameDataSchema);