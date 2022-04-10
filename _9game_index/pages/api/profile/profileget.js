import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"

export default async (req, res) => {
    await dbConnect()
    try {
        if (req.method == "POST") {
            const {user}=req.body
            console.log("get req Post")
            const profile= await User.findOne({email:user})
            //console.log(profile)
            
            if(!profile.profileimg){
                 console.log("not img")
                
            }else{
                 console.log("have img")
            }
            res.status(200).json(profile)
        }

    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            "status": "error",
            "message": "Error occur in admin."
        })
    }
}