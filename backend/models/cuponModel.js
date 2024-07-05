import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const cuponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  discountType: { type: String, enum: ['percent', 'fixed'], required: true },
  discountAmount: { type: Number, required: true },
  minPurchase: { type: Number, default: 0 }, // Monto mínimo de compra para aplicar el cupón
  active: { type: Boolean, default: true },
  expiryDate: { type: Date, required: true },
  user: { type: ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

const Cupon = mongoose.model('Cupon', cuponSchema);

export default Cupon;