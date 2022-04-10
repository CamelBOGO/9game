import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"



export default async (req, res) => {
    const {method} = req
    await dbConnect()

    switch (method) {
        case "POST":

            try {
                const {item,user}=req.body
                // console.log("backend image" + item)
                // console.log("backend email" + user)

                const newUser = User.findOneAndUpdate({ "email": user},
                {$set: { "profileimg": item  }},
                (error, data) =>{
                    console.log(user)
                    // console.log(item)

                });
                res.status(201).json({
                    "status": "success",
                    "message": "change successfully."
                })
            } catch (error) {
                res.status(422).json({
                    "status": "error",
                    "message": "cannot post"        
                })
                
            }
            break

        case "GET":
            try {

                const email="michael@gmail.com"
 
                const profile= await User.findOne({email:email})
                //console.log(profile)
                
                if(!profile.profileimg){
                    // console.log("not img")
                    
                }else{
                    // console.log("have img")
                }
                res.status(200).json(profile)
            } catch (error) {
                res.status(401).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}
