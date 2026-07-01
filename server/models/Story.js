import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
}, { timestamps: true }); // createdAt handled by timestamps — Date.new was a typo

storySchema.index({ userId: 1, createdAt: -1 }); // "fetch my stories, newest first"

export default mongoose.model('Story', storySchema);