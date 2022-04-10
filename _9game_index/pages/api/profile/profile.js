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
                // var profile = { $set: { "profileImg": image } };
                // console.log(profile)
                const newUser = User.findOneAndUpdate({ "email": email},
                {$set: { "profileimg": image  }},
                (error, data) =>{
                    // console.log(image)
                    // res.status(201).json({
                    //     "status": "success",
                    //     "message": "Change password successfully.",
                    //     "New Password": password,
                    // })
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
                // const {email}=req.body
                // console.log(email)
                // console.log(req.body)
                // const email="test@gmail.com"
                // const profile= User.findOne({email: email },{
                //     _id:0, profileImg:1,reset_token:0,isVerified:0,verification_token:0,accessToken:0,isAdmin:0
                // });
                // if(!profile){
                //     res.status(200).json({success: true, data: Photo});
                // }
                const profile= await User.findOne({email:"michael@gmail.com"})
                
                if(!profile.profileimg){
                    console.log("not img")
                    
                }else{
                    console.log("have img")
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
