import mongoose from "mongoose"
import { stringifyQuery } from "next/dist/server/server-route-utils"
import validator from "validator"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email Address"],
    },

    password: {
        type: String,
        required: true
    },

    reset_token: {
        type: String,
    },

    isVerified: {
        type: Boolean,
    },

    verification_token: {
        type: String,
    },

    accessToken: {
        type: String,
    },

    likedPosts: {
        type: Array
    },
    isAdmin:{
        type: Boolean
    },
    profileimg:{
        type:String
    },
})


export default mongoose.models.User || mongoose.model("User", userSchema)
