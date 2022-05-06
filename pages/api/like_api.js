/**
 * Header Comment Block: what, who, where, when, why, how
 * Like API for POST
 * Programmer: Fong Sze Chung
 * Call by like button module to handle like event in database
 * Version: 1, Date: 2022-04-09
 * Purpose: Handle the like event in server side, update the latest like values of each post
 * Data Structure:
 *      String:     currentuser     (current user name)
 *      Boolean:    inside          (boolean value passed by the current like button)
 * Algorithm:  
 *      Post Function:
 *          Receive request and response
 *          Check the current like state (true or false)
 *          Determine which database command will be sent 
 *          Send a request with the database command key determined by the boolean value
 */

import dbConnect from "../../lib/dbConnect";
import Post from "../../db_models/post_model";

export default async function handler(req, res) {
    // Connect DB
    await dbConnect()

    // Variables used in this API
    const {method, body} = req
    const inside = body.inside
    const currentuser = body.email

    // Method provided by this API
    switch (method) {
        // Try to send request and pass value to the database
        case "POST":
            try {
                if (inside) {
                    var action = {$pull: {"likeduser": currentuser}, $inc: {"likes": -1}}
                } 
                if (!inside) {
                    var action = {$push: {"likeduser": currentuser}, $inc: {"likes": 1}}
                }
                const updates = await Post.findOneAndUpdate({_id: body._id}, action)
                res.status(201).json({success: true, data: updates})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        
        default:
            res.status(400).json({success: false})
            break
    }
}
