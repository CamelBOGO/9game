import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"



export default async (req, res) => {
    await dbConnect()

    try {
        if (req.method == "POST") {
            const { email , password } = req.body
            const user = await User.findOne({ email: email })
            const accessKey = process.env.JWT_KEY

            if (!user) {
                res.status(422).json({ message:  "User does not exists"})
            }

            console.log(email, password)
    
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                res.status(404).json( {message: "Incorrect Credentials"} )
            } else {
                const token = jwt.sign( { userID: user.id }, accessKey,{
                    expiresIn:"7d",
                })

                res.status(201).json( {message: "Login Success", user, token} )
            }
        }
    } catch (error) {
        console.log(error)
    }
}