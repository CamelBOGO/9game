/**
 * Header Comment Block: what, who, where, when, why, how
 * Post API for POST and GET
 * Programmer: Yu Sun Leung
 * Called when client side need to fetch all post and post a post.
 * Version: 1, Date: 2022-04-01
 * Purpose: An API to fetch all post and post a post.
 * Data Structure:
 *      Object: req, res
 *
 * Algorithm:
 *      Receive req.
 *      Connect DB.
 *      If the method is post, create a post by coming data.
 *      If the method is get, fetch all post.
 *      If failed, return failed res code.
 *      Return res.
 */

import dbConnect from "../../../lib/dbConnect";
import Post from "../../../db_models/post_model";

export default async function handler(req, res) {
    // Get method from req and connect DB.
    const {method} = req
    await dbConnect()

    // Check req method.
    switch (method) {
        // If method is POST, create a new post.
        case "POST":
            try {
                const post = await Post.create(req.body)
                res.status(201).json({success: true, data: post})
            } catch (error) {
                // Return 400 if failed.
                res.status(400).json({success: false})
            }
            break

        // If method is GET, fetch all post from DB.
        case "GET":
            try {
                const posts = await Post.find({}) // Find all the data in database
                res.status(200).json({success: true, data: posts})
            } catch (error) {
                // Return 400 if failed.
                res.status(400).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}
