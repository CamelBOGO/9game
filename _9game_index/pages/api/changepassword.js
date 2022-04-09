import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from 'bcryptjs'


export default async (req, res) => {
    await dbConnect()             
    const { email , password } = req.body
    try {
        if (req.method == "POST") {
            console.log("get req Post")
            const user = await User.findOne({ email: email })
            const HashedPassword = await bcrypt.hash(password, 12)
            var newpasswaord = { $set: { password:HashedPassword  } };
            const newUser = await new User.updateOne({ email:email},newpasswaord,(error, data) =>{
                console.log(password,HashedPassword)
                res.status(201).json({
                    "status": "success",
                    "message": "Change password successfully.",
                    "New Password": password,
                    "data":data,
                })
            });


        }

    } catch (error) {
        res.status(422).json({
            "status": "error",
            "message": "Error occur in change password."
        })
    }
}