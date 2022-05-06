/**
 * Header Comment Block: what, who, where, when, why, how
 * profile Page
 * Programmer: Shek Tsz Chuen
 * The profile page called by user when user enter the host /profile.
 * Version: 8, Date: 2022-04-11
 * Purpose: Generate an profile page for logined user to see the users' profile.
 * Data Structure:
 *      User
 *      Current User
 *      image
 * 
 * Algorithm:
 *      Get Serverside Props:
 *          Connect DB.
 *          Check login.
 *          Get all user data.
 *          Return all user data and login status by props.
 *
 *      Rendering Function:
 *          Receive props.
 *          Created a function to handle uploading new profile image. 
 *          Return profile page rendering for the logged in user.
 *          If the user is admin, the profile page will show more function.
 *          Return "Please login first." if the user does not login yet.
 */
import { useState} from "react";
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import { parseCookies} from 'nookies'
import dbConnect from "../lib/dbConnect";
import User from "../db_models/user_model"
import {AppBar, Button, Toolbar, FormControl, Grid, TextField, Typography, Card, Box, Container} from "@mui/material";


export default function Profile({users, currentUser}) {
    //rendering a web page when user is logged in.
    if(currentUser){
        // Define variable to store the status for popup.
        const [image, setImage] = useState();
    
        const email=currentUser.email
        
        //user click the upload button
        const onSubmit = async (e) => {
            e.preventDefault()
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            // post data to the profile.js API
            const { data } = await axios.post("/api/profile/profile", { email,image}, config)
            // reload the page after the image is uploaded to db.
            window.location.reload();
        }
    


        // render the page for logged in user.
        return (
            <div style={{paddingTop: 56}}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" component="div" color="common.white" sx={{flexGrow: 1}}>
                            9Game
                        </Typography>
                            <>
                                {currentUser.isAdmin ? (     <>                           
                                <Button color="secondary" href="/admin">admin page</Button>
                                <Button color="secondary" href="/changepassword">Change Password</Button></>):(
                                    <></>
                                )}

                                {/* <Button color="secondary" sx={{mr: 2}} href="/profile">My Profile</Button> */}
                                <Button color="secondary" href="/">Home</Button>
                            </>
                    </Toolbar>
                </AppBar>
                <div>
                        {currentUser.isAdmin ? (
                        <div>
                        
                                <h1>Hello! admin:{currentUser.email}</h1>
                        
                        </div>
                    ):(
                        <div>
                            <p>Hello!{currentUser.email}</p>
                        </div>
                    )}
                    
                    {

                    

                    <div className="card" key={ currentUser._id}>                
    
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" width="300" height="300"  src={currentUser.profileimg} />
                    </div>


                    </div>
                    }


                </div>
                <div>
                <div className="row">

                    <form onSubmit={onSubmit}>
                        {/* <input type="text"  onChange={e => setItem({...item,email: e.target.value})}/> */}
                        <div className="form-group">
                                <FileBase64
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setImage( base64 )}
                                />

                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                    </div>
                </div>
                    
            </div>

        )
    }
    // render message if the user is not yet login.
    return(<Typography>Please login first.</Typography>)
    
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