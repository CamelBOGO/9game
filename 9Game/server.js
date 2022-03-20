const express = require("express")
const app = express()

const formidable = require("express-formidable")
app.use(formidable())

const mongodb = require("mongodb")
const dotenv = require("dotenv")
const http = require("http").createServer(app)

app.use("/public", express.static(__dirname + "/public"))
app.set("view engine", "ejs")

const socketIO = require("socket.io")(http)
const socketID = ""

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

app.get("/resetEmail", (req, res) => {
	res.render("resetEmail.ejs")
})

app.get("/index", (req, res) => {
	res.render("index.ejs")
})

//To server//
const mongoDBConnection = require("./connect.js")
mongoDBConnection.connect( function( err, client ) {
	if (err) {console.log(err)}
	console.log("Database connected.")
});


//Auth POST/GET //
const auth = require("./public/js/auth")
app.use("/auth", auth)


http.listen(3000, () => {
    console.log("9Game Started")   
})