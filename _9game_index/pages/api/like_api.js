import dbConnect from "../../lib/dbConnect";
import Post from "../../db_models/post_model";

export default async function handler(req, res) {
    const {method, body} = req
    await dbConnect()
    const inside = body.inside
    const currentuser = body.email

    switch (method) {
        case "POST":
            try {
                if (inside) {
                    var action = {$pull: {"likeduser": currentuser}, $inc: {"likes": -1}}
                } 
                if (!inside) {
                    var action = {$push: {"likeduser": currentuser}, $inc: {"likes": 1}}
                }
                const updates = await Post.findOneAndUpdate({_id: body._id}, action)
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
