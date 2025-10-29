import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // e.g. 'WELCOME100'
  discountType: { type: String, enum: ['flat', 'percent'], required: true }, 
  discountValue: { type: Number, required: true }, 
  minAmount: { type: Number, default: 0 }, //minimum booking amount to apply the promo
  validFrom: { type: Date, required: true },
  validTill: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 }, // total times the promo can be used
  usedCount: { type: Number, default: 0 }, // times it's already used
  active: { type: Boolean, default: true },
});

const PromoCode = mongoose.model("Promo", promoSchema);

export default PromoCode;
