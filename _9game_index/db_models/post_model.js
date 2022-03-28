import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    post_id: Number,
    title: String,
    content: String,
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema, "Posts")