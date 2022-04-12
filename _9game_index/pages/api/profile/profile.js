import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"


export default async (req, res) => {
    await dbConnect()
    const {email, item} = req.body
    console.log("email:" + email)

    try {
        if (req.method == "POST") {
            console.log("get req Post")
            // const abc=User.findOne({"email":email})
            // console.log(abc)
<<<<<<< Updated upstream
            const newUser = User.findOneAndUpdate({"email": email},
                {$set: {"profileimg": item}});
            console.log("newUser:" + newUser)
=======
            const newUser = await User.findOneAndUpdate({ "email": email},
            {$set: { "profileimg": item  }});
            console.log("newUser:"+newUser)
>>>>>>> Stashed changes
            res.status(201).json({
                "status": "success",
                "message": "change successfully.",
                "photo": item,
            })
        }

    } catch (error) {
        console.log(error)
        res.status(422).json({
            "status": "error",
            "message": "Error occur in change password."
        })
    }

}
