//Desiging the basic framework
//If there are any problems, please find Yiu


//add libraries
const dotenv = require("dotenv")
const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")


//middleware
const app = express()
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)


dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true}, () => {
    console.log("Connected to MONGO successfully\n")
});


// ****************************************************************************** //

//*** !!!!!!! USING .ejs TO BUILD THE HTML. Can change/delete if you would like to !!!!!!!!!!!!! ***//
//.ejs are all inside the folder "view"
app.set("view-engine", "ejs")
app.use(express.urlencoded({ extended: false }))    //take the data from the form

app.get("/", (req, res) => { res.render("index.ejs")})

app.get("/login", (req, res) => { res.render("login.ejs")})

app.get("/register", (req, res) => { res.render("register.ejs")})


// ****************************************************************************** //




app.listen(3000, () => {
    console.log("Back End Server Build Successfully")
})