import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"


export default async (req, res) => {
    await dbConnect()

    try {
        if (req.method == "PUT") {
            const { essential } = req.body
            const email = essential.email
            const verification_token = essential.v_token

            console.log("backend: " + essential.email)
            console.log("backend: " + essential.v_token)

            const user = await User.findOne({
                $and: [{
                    "email": email,
                }, {
                    "verification_token": parseInt(verification_token)
                }]
            })
            
            if (user==null){
                if(email == undefined && verification_token == undefined)   return
                req.status  = "error"
                req.message = "Email does not exists or link is expired."
            } else {
                await User.findOneAndUpdate({
                    $and: [{
                        "email": email,
                    }, {
                        "verification_token": parseInt(verification_token)
                    }]        
                }, {
                    $set: {
                        "verification_token" : "",
                        "isVerified" : true
                    }        
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