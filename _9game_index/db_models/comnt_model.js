import mongoose from "mongoose"

const ComntSchema = new mongoose.Schema({
    post_id: String,
    user_id: String,
    date: Date,
    text: String,
})

export default mongoose.models.Comnt || mongoose.model('Comnt', ComntSchema, "Comments")