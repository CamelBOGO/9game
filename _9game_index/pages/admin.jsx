import Head from "next/head"
import {useEffect,useState} from 'react'
import axios from 'axios'
import {useRouter} from "next/router";
import styles from "../styles/authstyle.module.css"
import { AppBar,Button,Toolbar,FormControl, Grid, TextField, Typography, Card} from "@mui/material";
// import dbConnect from "../lib/dbConnect";
// import User from"../db_models/user_model"
import cookies from 'nookies'
import { parseCookies } from 'nookies'



export default function admin() {
    const cookies = parseCookies()
    const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null
    // console.log("email:",user)
    const email="michael@gamil.com"
    // ,{ params: { email: user } }
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get("/api/profile/admin");  
          console.log('fetch data;m', result)
          console.log(result)
  
        }
        fetchData()
      }, [])

    return(
        <div style={{paddingTop: 56}}>
            <Head>
                <title>9Game</title>
            </Head>

            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" color="common.white" sx={{flexGrow: 1}}>
                        9Game
                    </Typography>
                    <Button color="inherit" href="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4">You are admin</Typography>
                {
                    // <Grid container style={{maxWidth: 700}}>
                    // {User.map((users) => (
                    //     <Grid item xs={12} sm={6} key={User.email}>
                    //         <Container maxWidth="false" sx={{width: 330, my: 2}}>
                    //             <IndexCard id={User._id} title={User.email} content={User.password}/>
                    //         </Container>
                    //     </Grid>
                    // ))}
                    // </Grid>
                    

                    }
            </Grid>
        </div>
    );

}
