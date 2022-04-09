import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import { Photo } from "@mui/icons-material";


export default async (req, res) => {
    const {method} = req
    await dbConnect()
    const {image}=  req.body
    const { email } = req.body
    console.log(email)
    switch (method) {
        case "POST":

            try {
                var profile = { $set: { "profileImg": image } };
                const newUser =  User.findOneAndUpdate({ email:email},profile, (error, data) => {
                    res.json({
                        "status": "success",
                        "message": "profile upload successfully",
                        
                    });})
                // res.status(201).json({success: true, data: newUser})
            } catch (error) {
                res.json({
                    "status": "error",
                    "message": "cannot post"        
                })
            }
            break

        case "GET":
            try {
                const profile=await User.findOne({email: email },{
                    _id:0, profileImg:1,reset_token:0,isVerified:0,verification_token:0,accessToken:0,isAdmin:0
                });
                if(!profile){
                    res.status(200).json({success: true, data: Photo});
                }
                res.status(200).json({success: true, data: profile})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}
