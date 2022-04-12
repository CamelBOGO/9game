import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

//email Format//
const mainURL = "http://localhost:3000"
const verification_token = new Date().getTime()
const nodemailerFrom = "CSCI3100GpE2@gmail.com"
const nodemailerObject = {	
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "CSCI3100GpE2@gmail.com",
		pass: "Csci3100E2"
	}
}
//email Format//

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
                                User.findOneAndUpdate({
                                    "email": email
                                }, {
                                    $set: {
                                        "verification_token": verification_token,
                                    }
                                }, (error, data) => {
                                    res.json({
                                        "status": "error",
                                        "message": "Email Not Verified. Resent.",
                                    })  
                                })        

                                const transporter = nodemailer.createTransport(nodemailerObject)
                                const text = "Please verify your account by clicking the following link: " + mainURL + "/verifyingEmail/" + email + "/" + verification_token
                                const html = "Please verify your account by clicking the following link: <br><br> <a href='" + mainURL + "/verifyingEmail/" + email + "/" + verification_token + "'>Click Here to Verify Your Email</a> <br><br> Thank You."
                    
                                transporter.sendMail({
                                    from: nodemailerFrom,
                                    to: email,
                                    subject: "Email Verification",
                                    text: text,
                                    html: html
                                }, function (error, info) {
                                    if (error){
                                        console.error(error)
                                    } else {
                                        console.log("Email sent: " + info.response)
                                    }
                                })  
                            }
                        } else {
                            res.json({
                                "status": "error",
                                "message": "Incorrect Password",
                            })    
                        }
                    })
                }
            })
        }
    } catch (error) {
        res.json({
            "status": "error",
            "message": "Unknown",
        })    
}
}