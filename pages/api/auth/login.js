/**
 * Header Comment Block: what, who, where, when, why, how
 * Login Page API
 * Programmer: Wong Wa Yiu
 * Date: 2022-06-05
 * This is the Login API for exchanging the data to and from the server side.
 * Purpose: Generate an Login password page for user.
 * Algorithm:
            1. dBConnect()
            2. Check to see if the email exists in the backend
            3. Check to see if the password matches the data contain in the database.
            4. If not correct, or user does not exists, return error json to the frontend
            5. Check to see if the account is verified or not.
            6. If the user account does not verified, send a verifying email to the user email
            7. If the account exists, the passsword matches the data in the database, and the account is verified,
                the users should be able to login
 */

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
            
            //check to see if the user exists or the password matches the database
            const user = User.findOne({ email: email }, (error, user) => {
                if(!user){
                    res.json({
                        "status": "error",
                        "message": "User does not exist"        
                    })
                } else {
                    //compare the password to see if the password matches
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
                                //resent a verifying email by updating the verification_token
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
                    
                                //send email
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