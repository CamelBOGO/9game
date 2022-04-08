import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: String,
    timestamp: String,
    postdate: String
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema, "Posts")
