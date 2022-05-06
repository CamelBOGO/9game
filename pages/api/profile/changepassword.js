/**
 * Header Comment Block: what, who, where, when, why, how
 * change password API
 * Programmer: Shek Tsz Chuen
 * Called when client side need to change password.
 * Version: 3, Date: 2022-04-11
 * Purpose: An API to fetch password.
 * Data Structure:
 *      Object: req, res
 * Algorithm:
 *      receive req.    
 *      Connect DB.
 *      If the method is post, updata the new password by the function key email.
 *      If failed, return failed res code.
 *      Return res.
 */
import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from 'bcryptjs'


export default async (req, res) => {
    // Connect to DB
    await dbConnect()             
    // Variables used in this API
    const { email , password } = req.body
    
    try {
        if (req.method == "POST") {
            const HashedPassword = await bcrypt.hash(password, 12)
            // update the new password to db.
            const newUser = User.findOneAndUpdate({ "email": email},
            {$set: { "password": HashedPassword  }},
            (error, data) =>{
                console.log(password,HashedPassword)
            });
            // Return 201 if success update.
            res.status(201).json({
                "status": "success",
                "message": "change successfully.",
                "new password":password,
            })
        }

    } 
    catch (error) {
        // Return 400 if failed.
        res.status(400).json({
            "status": "error",
            "message": "Error occur in change password."
        })
    }
}
