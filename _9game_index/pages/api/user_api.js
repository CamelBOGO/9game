import dbConnect from "../../lib/dbConnect";
import User from "../../db_models/user_model"

export default async function handler(req, res) {
    const {method, body} = req
    await dbConnect()

    const username = body.email;
    const likedPosts = body.likedPosts;

    switch (method) {
        case "POST":
            try {
                const liked = await User.findOneAndUpdate({"email": username}, {$set: {"likedPosts": likedPosts}})
                res.status(202).json({success: true, data: liked})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;

        default:
            res.status(400).json({success: false})
            break;
    }
}