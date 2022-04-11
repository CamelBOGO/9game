import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"



export default async (req, res) => {
    await dbConnect()             
    const {item,currentUser}=req.body
    try {
        if (req.method == "POST") {
            console.log("get req Post")
            const newUser = User.findOneAndUpdate({ "email": currentUser},
            {$set: { "profileimg": item  }},
            (error, data) =>{
                console.log("Here!!!!!!!!!!!!!!!!")
                
                res.status(200).json({
                    "status": "success",
                    "message": "change successfully.",
                })
            });

            res.status(201).json({
                "status": "success",
                "message": "change not successfully.",
                "photo":item,
            })
        }

    } 
    catch (error) {
        console.log(error)
        res.status(422).json({
            "status": "error",
            "message": "Error occur in change password."
        })
    }
    
}
