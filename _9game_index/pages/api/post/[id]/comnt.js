/**
 * Header Comment Block: what, who, where, when, why, how
 * Post Comment API for GET
 * Programmer: Yu Sun Leung
 * Call by post popup module
 * Version: 1, Date: 2022-04-12
 * Purpose: Get all the comments of the corressponding post id
 * Algorithm:
 *      GET Function:
 *          Send request to the database with specified post id
 *          Search for the comments belongs to this post id
 *          Return all the comments
 */

import dbConnect from "../../../../lib/dbConnect";
import Comnt from "../../../../db_models/comnt_model";

export default async function handler(req, res) {
    // Variable used in this API
    const {query: {id}, method} = req
    // Connect to DB
    await dbConnect()

    switch (method) {
        // Get all the comments of a post
        case "GET":
            try {
                let result = await Comnt.find({post_id: id.toString()})
                result = result.map((doc) => {
                    const result = doc.toObject()
                    result._id = result._id.toString()
                    result.date = result.date.toDateString()
                    return result
                })
                res.status(201).json({success: true, data: result})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}