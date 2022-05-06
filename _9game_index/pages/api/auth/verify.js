/**
 * Header Comment Block: what, who, where, when, why, how
 * Verify Page API
 * Programmer: Wong Wa Yiu
 * Date: 2022-06-05
 * This is the Verifying API for exchanging the data to and from the server side.
 * Purpose: Generate an verify page for user.
 * Algorithm:
            1. dBConnect()
            2. Extract the URL data from the URL. THe URL should consists of 2 essential components:
               User email and verifying token
            3. Check to see if the server contains the user information: email
            4. Check to see if the verifying token matches the database
            5. If yes, change verifying token field to "" and isVerified to true.
 */

import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"


export default async (req, res) => {
    await dbConnect()

    try {
        if (req.method == "PUT") {
            //extract data from the URL
            const { essential } = req.body
            const email = essential.email
            const verification_token = essential.v_token

            console.log("backend: " + essential.email)
            console.log("backend: " + essential.v_token)

            //find user data from the database
            const user = await User.findOne({
                $and: [{"email": email,}, 
                {"verification_token": parseInt(verification_token)}]
            })
            
            if (user==null){
                if(email == undefined && verification_token == undefined)   return
                res.json({
                    "status": "success",
                    "message": "Account has been activitated"
                })
            } else {
                //update the "isVerified" and "verification_toke"
                await User.findOneAndUpdate({
                    $and: [{
                        "email": email,
                    }, {
                        "verification_token": parseInt(verification_token)
                    }]        
                }, {
                    $set: {
                        "verification_token" : "",
                        "isVerified" : true
                    }        
                })
                              
                res.json({
                    "status": "success",
                    "message": "Account has been activitated"
                })
            }

            //console.log(email, token)
        }
    } catch(error) {
        res.json({
            "status": "error",
            "message": "Unknown Error",
        })    
    }
}