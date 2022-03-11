const router = require("express").Router()
const User = require("../models/User")

//Register
router.get("/register", async (req, res) => {
    const user = await new User({
        username: "csci3100",
        email: "CSCI3100GpE2@gmail.com",
        password: "csci3100",
        isAdmin: true
    })

    await user.save()
    res.send("ok")
})

module.exports = router;