// ! This API is NOT finished !
// This API has 2 function: post one comment, and get all comments.

import dbConnect from "../../../lib/dbConnect";
import Comnt from "../../../db_models/comnt_model";

export default async function handler(req, res) {
    const {method} = req
    await dbConnect()

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
