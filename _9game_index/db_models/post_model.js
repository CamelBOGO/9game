import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: String,
    postdate: Date,
    likes: Number
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema, "Posts")
