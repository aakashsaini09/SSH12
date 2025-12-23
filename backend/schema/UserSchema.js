import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        sparse: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    avatarUrl: String,
    city: {
        type: String,
        index: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})
export default UserSchema

