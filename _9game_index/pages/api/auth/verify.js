import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"

export default async (req, res) => {
    await dbConnect()

    try {
        if (req.method == "GET") {
            const { email, verification_token } = req.body
            const user = User.findOne({
                $and: [{
                    "email": email,
                }, {
                    "verification_token": parseInt(verification_token)
                }]
            })

            if (user == null){
                req.status  = "error"
                req.message = "Email does not exists or link is expired."
            } else {
                User.findOneAndUpdate({
                    $and: [{
                        "email": email,
                    }, {
                        "verification_token": parseInt(verification_token)
                    }]        
                }, {
                    $set: {
                        "verification_token": "",
                        "isVerified": true
                    }        
                }, (error, data) => {
                    res.json("Pass")
                })
                                
                req.status = "success"
                req.message = "Account has been activitated"        
            }

            //console.log(email, token)
        }
    } catch(error) {
        console.log(error)
    }
}