import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: String,
  description: String,
  userEmail: String,
  images: [String],
}, { timestamps: true });

export default mongoose.model('Story', storySchema);
