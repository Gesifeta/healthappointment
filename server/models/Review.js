import mongoose, { Schema } from "mongoose";


const reviewSchema = new Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        required: true
    },
}, { timestamps: true })
export const Review = mongoose.model("Review", reviewSchema)