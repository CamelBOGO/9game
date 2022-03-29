// ! This API is NOT finished !

import dbConnect from "../../../lib/dbConnect";
import post_model from "../../../db_models/post_model";

export default async function handler(req, res) {
    const {
        query: {id},
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            break
        case 'PUT':
            break
        case 'DELETE':
            break
        default:
            break
    }
}