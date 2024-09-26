import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    appointmentDate: {
        type: Date,
    },
    bookingType: {
        type: String,
        enum: ["instant", "regular"],
        default: "regular"
    },
    timeSlot: {
        type: String,
    }
}, { timestamps: true })
export const Booking = mongoose.model("Booking", bookingSchema)