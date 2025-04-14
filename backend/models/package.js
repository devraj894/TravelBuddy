import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  duration: String,
  image: String,
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
