/**
 * Header Comment Block: what, who, where, when, why, how
 * Schema for Comment
 * Programmer: Yu Sun Leung
 * The comment schema model called by server when system request for comment
 * Version: 1, Date: 2022-05-05
 * Purpose: Provided a formated data structure for the content of a comment
 * Data Stucture:
 * Variable     post_id - String
 *              user_id - String
 *              data    - Date
 *              text    - String 
 * Algorithm:
 */

import mongoose from "mongoose"

const ComntSchema = new mongoose.Schema({
    post_id: String,
    user_id: String,
    date: Date,
    text: String,
})

export default mongoose.models.Comnt || mongoose.model('Comnt', ComntSchema, "Comments")