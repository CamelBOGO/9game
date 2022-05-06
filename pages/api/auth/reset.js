/**
 * Header Comment Block: what, who, where, when, why, how
 * Reset Page API
 * Programmer: Wong Wa Yiu
 * Date: 2022-06-05
 * This is the Reset API for exchanging the data to and from the server side.
 * Purpose: Generate an reset password page for user.
 * Algorithm:
            1. dBConnect()
            2. Check to see if "password" equal to "confirm password"
            3. Hash the password
            4. Check to see if the server contains the user information: email
            5. If yes, update the hashed password and send it to the backend.
 */

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

            //check to see if the password matches the confirmed password
            if (password == "" || confirmPassword == "") {
                res.json({
                    "status": "error",
                    "message": "Password cannot be empty"
                })
            } else if (password != confirmPassword) {
                res.json({
                    "status": "error",
                    "message": "Password does not match"
                })
            } else {
                //find users
                user = await User.findOne({
                    $and:[{"email": email}, 
                    {"reset_token": parseInt(reset_token)}]        
                })
            }

            //hash the current password
            const hash = await bcrypt.hash(password, 12)

            if (user == null){
                res.json({
                    "status": "error",
                    "message": "Email does not exists, or recovery link is expired"
                })
            } else {
                //update the current data to the backend server
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