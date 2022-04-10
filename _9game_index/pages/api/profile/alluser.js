import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"

export default async (req, res) => {
    await dbConnect()
    try {
        if (req.method == "GET") {
            console.log("get req GET")

            const users = User.find({},{profileimg:0},
                (error, user) => {
                console.log("user",user)
            });
            res.status(200).json({ data: {users}})
        }

    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            "status": "error",
            "message": "Error occur in admin."
        })
    }
}