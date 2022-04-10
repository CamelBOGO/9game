import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from "bcryptjs";

let user

export default async (req, res) => {
    await dbConnect()

    try{
        if (req.method == "POST") {
            const { password, confirmPassword, essential } = req.body
            const email = essential.email
            const reset_token = essential.r_token

            //console.log(password, confirmPassword, email, reset_token)
            if (password != confirmPassword) {
                res.json({
                    "status": "error",
                    "message": "Password does not match"
                })
            } else {
                user = await User.findOne({
                    $and:[{"email": email}, 
                    {"reset_token": parseInt(reset_token)}]        
                })
            }

            const hash = await bcrypt.hash(password, 12)

            if (user == null){
                res.json({
                    "status": "error",
                    "message": "Email does not exists, or recovery link is expired"
                })
            } else {
                await User.findOneAndUpdate({
                    $and: [{
                         "email": email,
                     }, {
                         "reset_token": parseInt(reset_token)
                     }]
                }, {
                     $set:{
                        "reset_token": "",
                        "password": hash
                     }
                })
        
                res.json({
                    "status": "success",
                    "message": "Password has been changed successfully"
                })
            } 
        }

    } catch (error) { 
        console.log(error)
    }
}