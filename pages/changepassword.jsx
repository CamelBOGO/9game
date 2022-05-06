/**
 * Header Comment Block: what, who, where, when, why, how
 * Admin change passwork Page
 * Programmer: Shek Tsz Chuen
 * Version: 4, Date: 2022-04-11
 * Purpose: Generate an change password page for admin user only.
 * Data Structure:
 *      User
 *      Current User
 *      email
 *      password
 * Algorithm:
 *      Get Serverside Props:
 *          Connect DB.
 *          Check login.
 *          Return all user data and login status by props.
 *
 *      Rendering Function:
 *          Receive props.
 *          Created a function to handle the change password requst. 
 *          The requst will pass to changepassword.js API.
 *          If the logged in user is a admin.
 *              Return admin page rendering.
 *          Else retrun a error access page.
 *          
 */
import { useState } from 'react'
import axios from 'axios'
import { parseCookies } from 'nookies'
import dbConnect from "../lib/dbConnect";
import User from "../db_models/user_model"
import {AppBar, Button, Toolbar, FormControl, Grid, TextField, Typography, Card, Box, Container} from "@mui/material";


export default function ChangePassword({users, currentUser}) {
    //Check if the user logged in.
    if(currentUser){
        // data for change password.
        const [email,setEmail] = useState("")
        const [password, setPassword] = useState("")
        // when the change button click, do the following function.
        const SubmitHandler = async(e) => {
            e.preventDefault()

            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            // post data to changepassword API.
            const { data } = await axios.post("/api/profile/changepassword", { email, password }, config)
            
            console.log(data)
            // tell the user successed to change the password.
            alert("Password Changed")
        }
        // render a change password page for admin user only.
        return (
            <>
                            
                    { currentUser.isAdmin ? (
                    <div style={{paddingTop: 56}}>
                        {/* App Bar */}
                        <AppBar position="fixed">
                        <Toolbar>
                            <Typography variant="h6" component="div" color="common.white" sx={{flexGrow: 1}}>
                                9Game
                            </Typography>
                                <>
                                    {/*Function button: jump to admin page */}
                                    <Button color="secondary" href="/admin">admin page</Button>
                                    
                                    {/*Function button: jump to profile page */}
                                    <Button color="secondary" href="/profile">My Profile</Button>
                                    {/*Function button: jump to index page */}
                                    <Button color="secondary" href="/">Home</Button>
                                </>
                        </Toolbar>
                        </AppBar>
                    

                        <form onSubmit={SubmitHandler}>
                        <h1>Password Change</h1>
                        <input value = {email} onChange={e => setEmail(e.target.value)}/>
                        <br></br>
                        <input value = {password} onChange={e => setPassword(e.target.value)}/>
                        <button type="submit">Change</button>
                        </form>
                   </div>
                ):(
                    <div>
                        <Typography>You are not admin!!!</Typography>
                        <Button color="inherit" href="/">Click here to return home page</Button>
                    </div>
                )

                }


             </>    
            
        )
       
    } 
    // render error message for non-admin user.
    return( <div>
            <h1>error:404</h1>
            </div>)
}


// A server function which will run for every client request.
// It will run before the main functions.
export async function getServerSideProps(ctx) {
    //Try to connect the DB.
    await dbConnect()
    
    // Check login status.
    const cookies = parseCookies(ctx)
    const email = cookies?.email && cookies.email != "undefined" ? cookies.email : null

    // Fetch all user data from DB.
    const result = await User.find({})
    // Convert all datatype from DB datatype to a type that JS can support.
    const users = result.map((doc) => {
        const user = doc.toObject()
        user._id = user._id.toString()
        return user
    })

    // if the user is logged in.
    if(email){    
        let currentUser = await User.findOne({email: email}).lean()
        currentUser._id = currentUser._id.toString()
        // Return all user data and login status by props.
        return {props: {users: users, currentUser}}
    }

    // Return all user data and login status by props.
    return {props: {users: users, currentUser:null}}
}