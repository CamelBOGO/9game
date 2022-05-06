/**
 * Header Comment Block: what, who, where, when, why, how
 * Reset Page
 * Programmer: Wong Wa Yiu
 * Date: 2022-06-05
 * This page will be generated when the users click on the URL on the email sent.
 * Purpose: Generate an reset password page for user.
        There are 2 purpose for this forget.jsx
            1. Render the reset password page to give the basic UI design
            2. When the user click the submit button, the data should be pass to the reset.js API for
                the communication of backend for further checking.
 */

import { useState } from 'react'
import axios from 'axios'
import React from 'react'

import {useRouter} from "next/router";
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import {Grid, Paper, Avatar, FormControl, TextField, Link} from "@mui/material";


const Reset = () => {
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    //user click the submit button
    const SubmitHandler = async(e) => {
        const email = router.query["email"]
        const r_token = router.query["reset_token"]
        const essential= {"email": email, "r_token": r_token}
        console.log(essential)
    

        e.preventDefault()
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        //POST data to the API        
        const { data } = await axios.post("/api/auth/reset", { password, confirmPassword, essential }, config)

        //Return data from the API side
        const status = data.status
        const message = data.message
        if(status == "error"){
            alert(message)
        } else {
            alert(message)
            router.push("/login")
        }
    }

    //rendering
    const paperStyle = {margin: "20px", maxHeight:"500px", width: 300, borderRadius: "25px", padding: 20}
    const buttonStyle = {margin:"25px", width: 250, height: "50px", border: "1px solid", background: "#212121", borderRadius: "25px", "font-size": "18px", "color": "#e9f4fb"}
    return (
        <Grid container align="center" alignItems={"center"} justifyContent="center" style={{ minHeight: '100vh', fontFamily: "sans-serif" }}>

            <style>{"body { background: linear-gradient(315deg, #000000 0%, #ffffff 74%);}"}</style>
            <Paper elevation={20} style={paperStyle}>
                <div style={{margin:"30px auto"}}>
                    <Avatar style={{backgroundColor: "#212121"}}><ChangeCircleRoundedIcon/></Avatar>
                    <h2>Reset</h2>
                </div>

                <form onSubmit={SubmitHandler}>
                    
                    <FormControl style={{margin:"0px auto", width:250}}>
                        <TextField value={password} onChange={e => setPassword(e.target.value)} 
                            type="password"
                            label="Password"
                            margin="dense"
                            fullWidth required/>
                    </FormControl>
                    <br/>

                    <FormControl style={{margin:"0px auto", width:250}}>
                        <TextField value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} 
                            type="password"
                            label="Confirm Password"
                            margin="dense"
                            fullWidth required/>
                    </FormControl>

                    <button type="submit" style={buttonStyle}>Reset</button>
                </form>
                        
            </Paper>
        </Grid>
    )
}

export default Reset