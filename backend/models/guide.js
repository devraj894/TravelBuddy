import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
  role: {
    type: String,
    default: 'tour-guide'
  }
}, { timestamps: true });

export default mongoose.model('Guide', guideSchema);
