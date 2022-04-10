import Head from "next/head"
import {useState} from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import {useRouter} from "next/router";
import styles from "../styles/authstyle.module.css"
import { AppBar,Button,Toolbar,FormControl, Grid, TextField, Typography, Card} from "@mui/material";
import { parseCookies } from 'nookies'
import dbConnect from "../lib/dbConnect";
import User from"../db_models/user_model"

export default function admin(props) {
    const cookies = parseCookies()
    const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null
    // getServerSideProps(props)
    const testemail="michael@gmail.com"
    const result =  axios.get("/api/profile/admin",testemail);;
    const isAdmin= result.isAdmin
    console.log(result)
    console.log(isAdmin)

    
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
                {isAdmin ? (
                    // <Grid container style={{maxWidth: 700}}>
                    // {User.map((users) => (
                    //     <Grid item xs={12} sm={6} key={User.email}>
                    //         <Container maxWidth="false" sx={{width: 330, my: 2}}>
                    //             <IndexCard id={User._id} title={User.email} content={User.password}/>
                    //         </Container>
                    //     </Grid>
                    // ))}
                    // </Grid>
                    <Typography variant="h4">You are admin</Typography>
                ) : (
                    <Typography variant="h4">You are not admin</Typography>
                )}
            </Grid>
        </div>
    );

}

export async function getServerSideProps(props) {
    await dbConnect()
    const {id} = context.query


    // Here I show you how to fetch data in script,
    // but you can also call api to help you.
    let users = await User.findById(id).lean()
    users._id = users._id.toString()
    post.postdate = post.postdate.toString()

    const comntsResult = await Comnt.find({post_id: id.toString()})
    const comnts = comntsResult.map((doc) => {
        const comnt = doc.toObject()
        comnt._id = comnt._id.toString()
        comnt.date = comnt.date.toDateString()
        return comnt
    })

    return {props: {post: post, comnts: comnts}}
}