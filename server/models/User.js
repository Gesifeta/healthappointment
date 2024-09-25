
import mongoose from "mongoose";
import { Schema } from "mongoose";

export const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
    },
    qualification: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    }
    ,
    rating: Number,
    image: {
        type: String,
        required: false,
    }

}, { timestamps: true });

export const UserSchema = mongoose.model('user', userSchema);
