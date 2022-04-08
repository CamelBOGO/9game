import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from 'bcryptjs'


export default async (req, res) => {
    await dbConnect() 
    try {
        if (req.method == "POST") {
            const { email , password } = req.body
            const user = await User.findOne({ email: email })
            if (user) {
                res.status(422).json({ message:  "User already exists"})
            }

            console.log(email, password)
    
            const HashedPassword = await bcrypt.hash(password, 12)
            const newUser = await new User({ email:email, password:HashedPassword }).save()
        }
    } catch (error) {
        console.log(error)
    }
}