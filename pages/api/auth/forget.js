/**
 * Header Comment Block: what, who, where, when, why, how
 * Forget Page API
 * Programmer: Wong Wa Yiu
 * Date: 2022-06-05
 * This is the Forget API for exchanging the data to and from the server side.
 * Purpose: Generate an Forget password page for user.
 * Algorithm:
            1. dBConnect()
            2. Get the email from the URL.
            3. Check to see if the email exists in the backend.
            4. If yes, send a verifying email to the user's email. Noted that the email format is described as a constant first.
                i.)         MainURL
                ii.)        nodemailerFrom
                iii.)       nodemailerObject
 */

import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

//email Format//
const mainURL = "http://localhost:3000"
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

    try{
        if (req.method == "POST"){
            const { email } = req.body
            const user = await User.findOne({"email": email})

            //check to see if the user exists or not
            if (user == null){
                res.json({
                    "status": "error",
                    "message": "Email does not exist"
                })
            } else {
                const reset_token = new Date().getTime()

                //find the user email and update the reset_token
                await User.findOneAndUpdate({
                    "email": email
                }, {
                    $set:{
                        "reset_token": reset_token
                    }
                })

                // send a forget password email to the user's email
                const transporter = nodemailer.createTransport(nodemailerObject)
                const text = "Please click the following link to reset your password: " + mainURL + "/resetEmail/" + email + "/" + reset_token
                const html = "Please click the following link to reset your password: <br><br> <a href='" + mainURL + "/resetEmail/" + email + "/" + reset_token + "'>Click Here to Reset Your Email</a> <br><br> Thank You."

                transporter.sendMail({
                    from: nodemailerObject,
                    to: email,
                    subject: "Reset Password",
                    text: text,
                    html: html
                }, (error, info) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log("Email sent: " + info.response)
                    }
        
                    res.json({
                        "status": "success",
                        "message": "Email has been sent to reset password"
                    })
                })  
                
            }
        }
    } catch (error) {
        res.json({
            "status": "error",
            "message": "Unknown Error",
        })    
    }
}