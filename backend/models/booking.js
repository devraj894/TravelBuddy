import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  packageName: String,
  touristName: String,
  touristEmail: String,
  touristPhoto: String,
  price: Number,
  tourDate: Date,
  guideName: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
