import dbConnect from "../../lib/dbConnect";
import Post from "../../db_models/post_model";

export default async function handler(req, res) {
    const {method, body} = req
    await dbConnect()

    const likeduser = body.likeduser;
    switch (method) {
        case "POST":
            try {
                const post = await Post.findOneAndUpdate({_id: body._id}, {$set:{"likeduser":likeduser}})
                res.status(201).json({success: true, data: post})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        
        default:
            res.status(400).json({success: false})
            break
    }
}