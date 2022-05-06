/**
 * Header Comment Block: what, who, where, when, why, how
 * profile API
 * Programmer: Shek Tsz Chuen
 * Called when client side need to fetch the profile image.
 * Version: 3, Date: 2022-04-11
 * Purpose: An API to fetch profile image.
 * Data Structure:
 *      Object: req, res
 * Algorithm:
 *      Receive req.
 *      Connect DB.
 *      If the method is post, update the profile image by the function key email.
 *      If failed, return failed res code.
 *      Return res.
 */
import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"


export default async (req, res) => {
    // Connect to DB
    await dbConnect()             
    // Variables used in this API
    const {email, image} = req.body
 

    try {
        if (req.method == "POST") {
            // update the db
            const newUser = await User.findOneAndUpdate({"email": email},
                {$set: {"profileimg": image}});
            // Return 201 if success update.
            res.status(201).json({
                "status": "success",
                "message": "change successfully.",
                "photo": image,
            })
        }

    } catch (error) {
        // Return 400 if failed.
        res.status(400).json({
            "status": "error",
            "message": "Error occur in change password."
        })
    }

}
