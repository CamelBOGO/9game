import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"



export default async (req, res) => {
    await dbConnect() 

    if (req.method == "POST") {
        const { email , password } = req.body
        console.log(email, password)
        const newUser = await new User({ email:email, password:password }).save()
    }
}