import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: String,
    postdate: Date,
    likes: {
        type:           Number,
        validate        :{
            validator  : Number.isInteger,
            message     : props => `${props.value} is not an integer value`
        }
    },
    likeduser: Array
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema, "Posts")
