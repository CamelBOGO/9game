const express = require("express")
const app = express()

const formidable = require("express-formidable")
app.use(formidable())

const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const dotenv = require("dotenv")
const ObjectId = mongodb.ObjectId

const http = require("http").createServer(app)
const bcrypt = require("bcrypt")
const fileSystem = require("fs")

const jwt = require("jsonwebtoken")
const accessTokenSecret = "accessTokenSecret" 

app.use("/public", express.static(__dirname + "/public"))
app.set("view engine", "ejs")

const socketIO = require("socket.io")(http)
const socketID = ""
const users = []

const mainURL = "http://localhost:3000"

dotenv.config()

socketIO.on("connection", (socket) => {
	console.log("User connected", socket.id)
	socketID = socket.id
})

app.get("/", (req, res) => {
	res.redirect("/login")
})

app.get("/register", (req, res) => {
	res.render("register.ejs")
})

app.get("/login", (req, res) => {
	res.render("login.ejs")
})

app.get("/index", (req, res) => {
	res.render("index.ejs")
})


//To server//
mongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true}, (error, client) => {
	const database = client.db("9Game")
	console.log("Database connected.")

	app.post("/register", (req, res) => {
		const name = req.fields.name
		const username = req.fields.username
		const email = req.fields.email
		const password = req.fields.password
		const reset_token = ""

		database.collection("users").findOne({
			$or: [{
				"email": email
			}, {
				"username": username
			}]
		}, (error, user) => {
			if (user == null) {
				bcrypt.hash(password, 10, (error, hash) => {
					database.collection("users").insertOne({
						"name": name,
						"username": username,
						"email": email,
						"password": hash,
						"reset_token": reset_token,
					}, (error, data) => {
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

	app.post("/login", (req, res) => {
		const username = req.fields.username
		const password = req.fields.password
		database.collection("users").findOne({
			"username": username
		}, (error, user) => {
			if (user == null) {
				res.json({
					"status": "error",
					"message": "User does not exist"
				})
			} else {
				bcrypt.compare(password, user.password, (error, isVerify) => {
					if (isVerify) {
						const accessToken = jwt.sign({ username: username }, accessTokenSecret)
						database.collection("users").findOneAndUpdate({
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
							"message": "Password is not correct"
						})
					}
				})
			}
		})
	})
})




http.listen(3000, () => {
    console.log("9Game Started")   
})