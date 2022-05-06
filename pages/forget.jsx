/**
 * Header Comment Block: what, who, where, when, why, how
 * Forget Page
 * Programmer: Wong Wa Yiu
 * Date: 2022-06-05
 * Purpose: Generate an forget page for user to type their email and send an verifying email.
        There are 2 purpose for this forget.jsx
            1. Render the forget page to give the basic UI design
            2. When the user click the submit button, the data should be pass to the forget.js API for
                the communication of backend for further checking.
 */

import { useState } from 'react'
import axios from 'axios'
import {useRouter} from "next/router";
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import {Grid, Paper, Avatar, FormControl, TextField, Link} from "@mui/material";



const forget = () => {
    // Define variable to store the status for forget function.
    // email
    const [email,setEmail] = useState("")
    const router = useRouter()
    
    //user click the submit button
    const SubmitHandler = async(e) => {
        e.preventDefault()

        
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        //POST data to the API
        const { data } = await axios.post("/api/auth/forget", { email }, config)

        //Return data from the API side
        const status = data.status
        const message = data.message
        // check if the fetch success
        if(status == "error"){
            // error message
            alert(data.message)
        } else {
            // success message
            alert(data.message)
            // back to login page
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
                    <Avatar style={{backgroundColor: "#212121"}}><HelpRoundedIcon/></Avatar>
                    <h2>Forget Password</h2>
                </div>

                <form onSubmit={SubmitHandler}>
                    <FormControl style={{margin:"0px auto", width:250}}>
                        <TextField value={email} onChange={e => setEmail(e.target.value)} 
                            type="email"
                            label="email"
                            margin="dense"
                            fullWidth required/>
                    </FormControl>
                    <br/>

                    <button type="submit" style={buttonStyle}>Submit</button>
                </form>

                <Grid align = "center" style={{margin:"0px auto"}}>
                    <Link href="/login" sx={{mx: 3}} style={{textDecoration: "none"}}>Already has an account? </Link>
                </Grid>
                        
            </Paper>
        </Grid>
    )
}

export default forget