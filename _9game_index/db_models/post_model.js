/**
 * Header Comment Block: what, who, where, when, why, how
 * Schema for Post
 * Programmer: Fong Sze Chung, Yu Sun Leung
 * The post schema model called by server when system request for post
 * Version: 2, Date: 2022-05-05
 * Purpose: Provided a formated data structure for the content of a post
 * Data Stucture:
 * Variable     
 *      String: title
 *              content
 *              username
 *      Date:   postdate
 *      Number: likes
 * Array        
 *      User:   likeduser
 */

import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: String,
    postdate: Date,
    likes: {
        type:           Number,
        validate        :{
            validator  : Number.isInteger,
            message     : props => `${props.value} is not an integer value`
        }
    },
    likeduser: Array
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema, "Posts")
