/**
 * Header Comment Block: what, who, where, when, why, how
 * Schema for User
 * Programmer: Yu Sun Leung, Wong Wai Yiu, Shek Tsz Chuen, Fong Sze Chung
 * The user schema model called by server when system request for user
 * Version: 2, Date: 2022-05-05
 * Purpose: Provided a formated data structure for the content of a user
 * Data Stucture:
 * Variable     email                   - String
 *              password                - String
 *              reset_token             - String
 *              isVerified              - Boolean
 *              verification_token      - String
 *              accessToken             - String
 *              isAdmin                 - Boolean
 *              profileimg              - String
 * Array        likedPosts              - array
 * Algorithm:
 */

import mongoose from "mongoose"
import { stringifyQuery } from "next/dist/server/server-route-utils"
import validator from "validator"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    reset_token: {
        type: String,
    },

    isVerified: {
        type: Boolean,
    },

    verification_token: {
        type: String,
    },

    accessToken: {
        type: String,
    },

    likedPosts: {
        type: Array
    },
    isAdmin:{
        type: Boolean
    },
    profileimg:{
        type:String
    },
})

export default mongoose.models.User || mongoose.model("User", userSchema)
