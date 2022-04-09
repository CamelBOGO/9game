import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export default async (req, res) => {
    await dbConnect()

    try {
        if (req.method == "POST") {
            const { email , password } = req.body

            const user = User.findOne({ email: email }, (error, user) => {
                if(!user){
                    res.json({
                        "status": "error",
                        "message": "User does not exist"        
                    })
                } else {
                    bcrypt.compare(password, user.password, (error, isVerified) => {
                        const accessToken = jwt.sign({ userID: user._id }, process.env.JWT_KEY,{
                            expiresIn: "7d",
                        })
                        if(isVerified){
                            if(user.isVerified){
                                User.findOneAndUpdate({
                                    "email": email
                                }, {
                                    $set: {
                                        "accessToken": accessToken,
                                    }
                                }, (error, data) => {
                                    res.json({
                                        "status": "success",
                                        "message": "Login successfully",
                                        "email": email,
                                        "accessToken": accessToken,
                                    })
                                })        
                            } else {
                                res.json({
                                    "status": "error",
                                    "message": "Email Not Verified",
                                })    
                            }
                        } else {
                            res.json({
                                "status": "error",
                                "message": "Email Not Verified",
                            })    
                        }
                    })
                }
            })
        }
    } catch (error) {
        //console.log(error)
        res.json({
            "status": "error",
            "message": "Password is not correct"
        })
    }
}