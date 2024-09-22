
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
    phone:{
        type: String,
        required: true,
    }
}, {timestamps: true});

export const UserSchema = mongoose.model('user', userSchema);
