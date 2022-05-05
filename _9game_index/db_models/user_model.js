import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
