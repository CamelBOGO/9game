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
                const query = { "email":email}
                const update = {
                    $set: { "profileImg": image }
                }
                const options = {
                  upsert: true,
                  new: true,
                  setDefaultsOnInsert: true
                };
                // var profile = { $set: { "profileImg": image } };
                // console.log(profile)
                const newUser =  User.findOneAndUpdate(query, update, options, 
                (error, data) => {
                    // res.json({
                    //     "status": "success",
                    //     "message": "profile upload successfully",
                    //     "data": newUser
                    // });
                    // res.end(JSON.stringify(newUser));
                    console.log(newUser)
                    }
                )
                res.status(201).json({success: true, data: newUser})
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
                const profile= await User.findOne({email:"test@gmail.com"})
                console.log(profile.profileImg)
                if(!profile.profileImg){
                    console.log("not img")
                    
                }
                res.status(200).json({success: true, data: profile.profileImg})
            } catch (error) {
                res.status(401).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}
