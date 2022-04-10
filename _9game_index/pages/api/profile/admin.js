import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"


export default async (req, res) => {
    await dbConnect()
    let checkadmin = false
    const {user} = req.body

    try {
        if (req.method == "POST") {
            console.log("get req GET")
            console.log(user)
            const admin = User.findOne({"email": user}, (error, user) => {
                console.log("user", user.isAdmin)
                if (user.isAdmin == true) {
                    checkadmin = true;
                    res.status(201).json({success: true, "isAdmin": true})
                } else {
                    console.log("ADMIN NOT FOUND!")
                    res.status(201).json({success: true, "isAdmin": false})
                }
            });
            console.log("check", checkadmin)


        } else {
            res.status(400).json({
                "status": "error",
                "message": "Error occur in admin."
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            "status": "error",
            "message": "Error occur in admin."
        })
    }
}
