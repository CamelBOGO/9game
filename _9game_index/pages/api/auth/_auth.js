export default async function handler(req, res) {
    const {method} = req
    const username = req.body.username

    switch (method) {
        case "POST":
            res.status(200).json({status: "success", message: username})
            break
        default:
            res.status(200).json({status: "success", message: "success"})
            break
    }
}
