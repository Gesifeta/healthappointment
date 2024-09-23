
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
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
    ,
    image: {
        type: String,
        required: false,
    }

}, { timestamps: true });

export const UserSchema = mongoose.model('user', userSchema);
