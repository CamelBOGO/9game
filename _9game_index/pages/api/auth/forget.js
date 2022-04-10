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


            if (user == null){
                res.json({
                    "status": "error",
                    "message": "Email does not exist"
                })
            } else {
                const reset_token = new Date().getTime()

                await User.findOneAndUpdate({
                    "email": email
                }, {
                    $set:{
                        "reset_token": reset_token
                    }
                })

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
        console.log(error)
    }
}