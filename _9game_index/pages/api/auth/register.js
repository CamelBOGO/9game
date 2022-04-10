import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from 'bcryptjs'
import nodemailer from "nodemailer"


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


//declare constant//
const reset_token = ""
const isVerified = false
const verification_token = new Date().getTime()
//declare constant//


export default async (req, res) => {
    await dbConnect() 
    try {
        if (req.method == "POST") {
            const { email , password, confirmPassword } = req.body
            if( password != confirmPassword) {
                res.json({
                    "status": "error",
                    "message": "Password Not Match"
                })
            } else {
                const user = await User.findOne({ email: email })
                const HashedPassword = await bcrypt.hash(password, 12)
                const newUser = await new User({ email:email, password:HashedPassword, reset_token: reset_token, 
                    isVerified: isVerified, verification_token: verification_token, isAdmin: false }).save()
    
    
                //*****************************Email*****************************//
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
    
                res.json({
                    "status": "success",
                    "message": "Signed up successfully.Please Verify Your Email."
                })                
            }

        }

    } catch (error) {
        res.json({
            "status": "error",
            "message": "Email or username already exist."
        })
    }
}