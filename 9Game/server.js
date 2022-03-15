const express = require("express");
const app = express();

const formidable = require("express-formidable");
app.use(formidable());

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv")
const ObjectId = mongodb.ObjectId;

const http = require("http").createServer(app);
const bcrypt = require("bcrypt");
const fileSystem = require("fs");

const jwt = require("jsonwebtoken");
const accessTokenSecret = "accessTokenSecret"; 

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const socketIO = require("socket.io")(http);
const socketID = "";
const users = [];

const mainURL = "http://localhost:3000";

socketIO.on("connection", function (socket) {
	console.log("User connected", socket.id);
	socketID = socket.id;
});

dotenv.config()
http.listen(3000, function(){
    console.log("Server Started");   

	mongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true}, function (error, client) {
		const database = client.db("9Game");
		console.log("Database connected.");

		app.get("/register", function(request, result){
			result.render("register");
		});

		app.post("/register", function(request,result){
			const name = request.fields.name;
			const username = request.fields.username;
			const email = request.fields.email;
			const password = request.fields.password;

			database.collection("users").findOne({
				$or: [{
					"email": email
				}, {
					"username": username
				}]
			}, function (error, user) {
				if (user == null) {
					bcrypt.hash(password, 10, function (error, hash) {
						database.collection("users").insertOne({
							"name": name,
							"username": username,
							"email": email,
							"password": hash,
						}, function (error, data) {
							result.json({
								"status": "success",
								"message": "Register successfully."
							});
						});
					});
				} else {
					result.json({
						"status": "error",
						"message": "Email or username already exist."
					});
				}
			});	
		})
    })
})