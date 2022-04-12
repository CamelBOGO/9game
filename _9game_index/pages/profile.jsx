import { useState} from "react";
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import { parseCookies} from 'nookies'
import dbConnect from "../lib/dbConnect";
import User from "../db_models/user_model"
import {AppBar, Button, Toolbar, FormControl, Grid, TextField, Typography, Card, Box, Container} from "@mui/material";


export default function Profile({users, currentUser}) {
    if(currentUser){
        const [item, setItem] = useState();
    
        const email=currentUser.email


        const onSubmit = async (e) => {
            e.preventDefault()
            //console.log(email, password)
            console.log(item)
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post("/api/profile/profile", { email,item}, config)
            console.log(data)
            window.location.reload();
        // console.log("image",item.image)
        }
    



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
                                onDone={({ base64 }) => setItem( base64 )}
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
    return(<div>
        <h1>error:404</h1>
    </div>)
    
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