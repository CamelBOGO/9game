import dbConnect from "../../../lib/dbConnect";
import User from "../../../db_models/user_model"

export default async (req, res) => {
    await dbConnect()

    try {
        if (req.method == "POST") {
            const { email, token } = req.body
            console.log(email)
            console.log(token)
        }
    } catch(error) {
        console.log(error)
    }
}