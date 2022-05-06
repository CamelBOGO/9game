/**
 * Header Comment Block: what, who, where, when, why, how
 * Comment API for POST and GET
 * Programmer: Yu Sun Leung
 * Call by post module to post comments to or fetch comments from the database
 * Version: 1, Date: 2022-04-09
 * Purpose: To handle the GET and POST event of comments
 * Algorithm:
 *      GET Function:
 *          Get all comments from the database
 *      Post Function:
 *          Post or add one comment to the database
 */

import dbConnect from "../../../lib/dbConnect";
import Comnt from "../../../db_models/comnt_model";

export default async function handler(req, res) {
    // Connect to DB
    await dbConnect()
    // Variables used in this API
    const {method} = req

    switch (method) {
        // Post one comment.
        case "POST":
            try {
                const result = await Comnt.create(req.body)
                res.status(201).json({success: true, data: result})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        // Get all comments.
        case "GET":
            try {
                const result = await Comnt.find({}) // Find all the data in database
                res.status(200).json({success: true, data: result})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}
