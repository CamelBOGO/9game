const database = require("../../db.js")

const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const accessTokenSecret = "accessTokenSecret" 
const users = []

//**********Verifying Email*****************//
const mainURL = "http://localhost:3000"
const nodemailer = require("nodemailer")
const nodemailerFrom = "CSCI3100GpE2@gmail.com"
const nodemailerObject = {	
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "CSCI3100GpE2@gmail.com",
		pass: "Csci3100E2"
	}
}

//************Register*****************//
router.post("/register", (req, res) => {
    const name = req.fields.name
    const username = req.fields.username
    const email = req.fields.email
    const password = req.fields.password
    const reset_token = ""
    const isVerified = false;
    const verification_token = new Date().getTime()

    database.get().collection("users").findOne({
        $or: [{
            "email": email
        }, {
            "username": username
        }]
    }, (error, user) => {
        if (user == null) {
            bcrypt.hash(password, 10, (error, hash) => {
                database.get().collection("users").insertOne({
                    "name": name,
                    "username": username,
                    "email": email,
                    "password": hash,
                    "reset_token": reset_token,
                    "isVerified": isVerified,
                    "verification_token": verification_token
                }, (error, data) => {

                    const transporter = nodemailer.createTransport(nodemailerObject)
                    const text = "Please verify your account by clicking the following link: " + mainURL + "/auth/verifyingEmail/" + email + "/" + verification_token
                    const html = "Please verify your account by clicking the following link: <br><br> <a href='" + mainURL + "/auth/verifyingEmail/" + email + "/" + verification_token + "'>Click Here to Verify Your Email</a> <br><br> Thank You."

                    transporter.sendMail({
                        from: nodemailerFrom,
                        to: email,
                        subject: "Email Verification",
                        text: text,
                        html: html
                    }, function (error, info) {
                        if (error){
                            console.error(error)
                        } else {
                            console.log("Email sent: " + info.response)
                        }
                    })

                    res.json({
                        "status": "success",
                        "message": "Signed up successfully."
                    })
                })
            })
        } else {
            res.json({
                "status": "error",
                "message": "Email or username already exist."
            })
        }
    })
})


//************Login*****************//
router.post("/login", (req, res) => {
    const username = req.fields.username
    const password = req.fields.password

    database.get().collection("users").findOne({
        "username": username
    }, (error, user) => {
        if (user == null) {
            res.json({
                "status": "error",
                "message": "User does not exist"
            })} else {
            bcrypt.compare(password, user.password, (error, isVerify) => {
                if (isVerify) {
                    if (user.isVerified){
                        const accessToken = jwt.sign({ username: username }, accessTokenSecret)
                        database.get().collection("users").findOneAndUpdate({
                            "username": username
                        }, {
                            $set: {
                                "accessToken": accessToken
                            }
                        }, (error, data) => {
                            res.json({
                                "status": "success",
                                "message": "Login successfully",
                                "accessToken": accessToken,
                                "profileImage": user.profileImage
                            })
                        })
                    } else {
                        res.json({
                            "status": "error",
                            "message": "Email Not Verified",
                        })
                }
                } else {
                    res.json({
                        "status": "error",
                        "message": "Password is not correct"
                    })
                }
            })
        }
    })
})

//**********Verifying Email*****************//
router.get("/verifyingEmail/:email/:verification_token", async(req, res) => {
    const email = req.params.email
    const verification_token = req.params.verification_token
    const user = await database.get().collection("users").findOne({
        $and: [{
            "email": email,
        }, {
            "verification_token": parseInt(verification_token)
        }]
    })

    if (user == null && false){
        req.status = "error"
        req.message = "Email does not exists or link is expired."
        res.render("login.ejs", {
            "request": req
        })
    } else {
        await database.get().collection("users").findOneAndUpdate({
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
        })

        req.status = "success"
        req.message = "Account has been activitated"
        res.render("verifyPage.ejs", {"request": req})
    }
})

module.exports = router