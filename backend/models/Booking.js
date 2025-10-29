import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    promo:{
        type: String,
        
    },
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}
);
export default mongoose.model("Booking", bookingSchema);    