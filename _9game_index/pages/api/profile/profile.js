import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"



export default async (req, res) => {
    const {method} = req
    await dbConnect()

    switch (method) {
        case "POST":

            try {
                const {email,image}=req.body
                console.log(email)

                const newUser = User.findOneAndUpdate({ "email": email},
                {$set: { "profileimg": image  }},
                (error, data) =>{
                    // console.log(image)

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
                
                if(!profile.profileimg){
                    // console.log("not img")
                    
                }else{
                    // console.log("have img")
                }
                res.status(200).json({ data: profile})
            } catch (error) {
                res.status(401).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}
