import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"


export default async (req, res) => {
    await dbConnect()

    try {
        if (req.method == "GET") {
            console.log(email)
            User.findOne({ email: email }, (error, user) => {
                if(user.isAdmin){
                    const users = User.find();
                    console.log(users)
                    res.status(200).json({success: true, data: users})
                }else{
                    res.status(422).json({
                        "status": "error",
                        "message": "Not a admin"
                    })
                }
            })         
            
        }
    } catch (error) {
        //console.log(error)
        res.json({
            "status": "error",
            "message": "Password is not correct"
        })
    }
}
