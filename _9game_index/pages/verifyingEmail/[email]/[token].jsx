import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'

import styles from "../../../styles/authstyle.module.css"
import {FormControl, Grid, TextField, Typography, Card, Link} from "@mui/material";


export default function EmailConfirm(){
  const router = useRouter()
  
  const email = router.query["email"]
  const v_token = router.query["token"]

  console.log(email, v_token)
  
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
        const { data } = await axios.put("/api/auth/verify", {essential}, config)

    } catch(error) {
      //console.log(error)
    }
  }
  return (
    <div className={styles.body}>
      <Grid
        container
        sx={{pt: 2}}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >

        <Card sx={{width: 400, height: 300, boxShadow: 10}}>
          <Grid
            container
            sx={{pt: 2}}
            direction="column"
            alignItems="center"
            justifyContent="center">

              <Typography variant="h3" sx={{mt: 2}}>Email Verified</Typography>
              <br/>
              <br/>
              <br/>
              <br/>
              <Link href="/login" sx={{mx: 3}}>Back to Login Page</Link>

          </Grid>
        </Card>
      </Grid>
    </div>
  )  
}