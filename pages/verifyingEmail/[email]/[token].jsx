/**
 * Header Comment Block: what, who, where, when, why, how
 * Verify Page
 * Programmer: Wong Wa Yiu
 * Date: 2022-06-05
 * This page will be generated when the users click on the URL on the email sent.
 * Purpose: Generate an verify page for user.
        There are 2 purpose for this forget.jsx
            1. Render the verify page to give the basic UI design
            2. When the user click the submit button, the data should be pass to the [token].js API for
                the communication of backend for further checking.
 */

import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {Grid, Paper, Avatar, Typography, Link} from "@mui/material";


export default function EmailConfirm(){
  const router = useRouter()
  
  const email = router.query["email"]
  const v_token = router.query["token"]

  console.log(email, v_token)
  
  //when the page once arrived
  React.useEffect(() => {
    sendToken(email, v_token)
  }, [email, v_token])  

  const sendToken = async(e) => {
    try {
        const config = {
            headers:{
                "Content-Type": "application/json"
            },
        }
        const essential= {"email": email, "v_token": v_token}

        //PUT data to the API
        const { data } = await axios.put("/api/auth/verify", {essential}, config)
        
        return data.message
    } catch(error) {
      //console.log(error)
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
                  <Avatar style={{backgroundColor: "#212121"}}><CheckCircleOutlineRoundedIcon/></Avatar>
                  <h3>Email Verified</h3>
              </div>

              <Grid align = "center" style={{margin:"0px auto"}}>
                  <Link href="/login" sx={{mx: 3}}>Back to Login Page </Link>
              </Grid>
                      
          </Paper>
      </Grid>
  )


}