import dbConnect from "../../../../lib/dbConnect";
import Comnt from "../../../../db_models/comnt_model";

export default async function handler(req, res) {
    const {query: {id}, method} = req
    await dbConnect()

    switch (method) {
        case "GET":
            try {
                let result = await Comnt.find({post_id: id.toString()})
                result = result.map((doc) => {
                    const result = doc.toObject()
                    result._id = result._id.toString()
                    result.date = result.date.toDateString()
                    return result
                })
                res.status(201).json({success: true, data: result})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}