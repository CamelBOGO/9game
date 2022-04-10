import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"


export default async (req, res) => {
    await dbConnect()
    let checkadmin=false
    const { email  } = req.body
    console.log(email)
    try {
        if (req.method == "GET") {
            console.log("get req GET")

            const admin = User.findOne({ "email": "michael@gmail.com"},(error, user) => {
                console.log("user",user.isAdmin)
                if(user.isAdmin==true){
                    checkadmin=true;
                    res.status(200).json({
                    "statue":"success",
                    "message":"you are admin"
                })
                }else{
                    res.status(422).json({
                    "status":"error",
                    "message":"not a admin"
                })
                }
            });
            console.log("check",checkadmin)


            // res.status(201).json({
            //     "status": "success",
            //     "message": "change successfully."
            // })
        }

    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            "status": "error",
            "message": "Error occur in admin."
        })
    }

    // try {
    //     if (req.method == "GET") {
    //         const {email}=req.body
    //         console.log(email)
    //         const profile= await User.findOne({email:email})
    //         if(profile.isAdmin==true){
    //             const users= await User.find()
    //             console.log(users)
    //             res.status(200).json({success:true, data: users})
    //         }else{
    //             res.status(422).json({
    //                             "status": "error",
    //                             "message": "Not a admin"})
    //         }

    //         // User.findOne({ email: email }, (error, user) => {
    //         //     if(user.isAdmin){
    //         //         const users = User.find();
    //         //         console.log(users)
    //         //         res.status(200).json({success: true, data: users})
    //         //     }else{
    //         //         res.status(422).json({
    //         //             "status": "error",
    //         //             "message": "Not a admin"
    //         //         })
    //         //     }
    //         // })         
            
    //     }
    // } catch (error) {
    //     //console.log(error)
    //     res.status(400).json({
    //         "status": "error",
    //         "message": "fetch error"
    //     })
    // }
}
