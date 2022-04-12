import { useState } from 'react'
import axios from 'axios'
import { parseCookies } from 'nookies'
import dbConnect from "../lib/dbConnect";
import User from "../db_models/user_model"
import {AppBar, Button, Toolbar, FormControl, Grid, TextField, Typography, Card, Box, Container} from "@mui/material";


export default function ChangePassword({users, currentUser}) {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const SubmitHandler = async(e) => {
        e.preventDefault()
        //console.log(email, password)
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post("/api/profile/changepassword", { email, password }, config)
        console.log(data)
    }
    return (
        <div>
            {currentUser?(<>            
                { currentUser.isAdmin ? (

                <form onSubmit={SubmitHandler}>
                <h1>Password Change</h1>
                <input value = {email} onChange={e => setEmail(e.target.value)}/>
                <br></br>
                <input value = {password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Change</button>
                </form>
            ):(
                <div>
                    <h1>error:404</h1>
                    {/* <Button color="inherit" href="/">Click here to return home page</Button> */}
                </div>
            )

            }
            </>):(
                    <h1>error:404 notfind</h1>
                )}


        </div>
    )
}

export async function getServerSideProps(ctx) {
    await dbConnect()
    const cookies = parseCookies(ctx)
    const email = cookies?.email && cookies.email != "undefined" ? cookies.email : null

    const result = await User.find({})
    const users = result.map((doc) => {
        const user = doc.toObject()
        user._id = user._id.toString()
        return user
    })

    if(email){    
        let currentUser = await User.findOne({email: email}).lean()
        currentUser._id = currentUser._id.toString()
        return {props: {users: users, currentUser}}
    }


    return {props: {users: users, currentUser:null}}
}