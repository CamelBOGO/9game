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

socketIO.on("connection", function (socket) {
	console.log("User connected", socket.id)
	socketID = socket.id
})

dotenv.config()
http.listen(3000, function(){
    console.log("Server Started")   

	mongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true}, function (error, client) {
		const database = client.db("9Game")
		console.log("Database connected.")


		//****************************************************************************************/
		app.get("/register", function(req, res){
			res.render("register")
		})


		app.post("/register", function (req, res) {
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
					bcrypt.hash(password, 10, function (error, hash) {
						database.collection("users").insertOne({
							"name": name,
							"username": username,
							"email": email,
							"password": hash,
							"reset_token": reset_token,
						}, function (error, data) {
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
		//****************************************************************************************/

		//****************************************************************************************/
		app.get("/login", (req, res) => {
			res.render("login.ejs")
		})

		app.post("/login", (req, res) => {
			 email = req.fields.email
			const password = req.fields.password
			database.collection("users").findOne({
				"email": email
			}, (error, user) => {
				if (user == null) {
					res.json({
						"status": "error",
						"message": "Email does not exist"
					})
				} else {
					bcrypt.compare(password, user.password, (error, isVerify) => {
						if (isVerify) {
							const accessToken = jwt.sign({ email: email }, accessTokenSecret)
							database.collection("users").findOneAndUpdate({
								"email": email
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
		//****************************************************************************************/

    })
})