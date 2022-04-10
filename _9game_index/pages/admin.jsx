import Head from "next/head"
import {useEffect, useState} from 'react'
import axios from 'axios'
import {AppBar, Button, Toolbar, FormControl, Grid, TextField, Typography, Card, Box, Container} from "@mui/material";
import IndexCard from "../components/card";
import dbConnect from "../lib/dbConnect";
import User from "../db_models/user_model"
import cookies from 'nookies'
import {parseCookies} from 'nookies'


export default function admin({users, currentUser}) {
    const cookies = parseCookies()
    const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null
    console.log("email:", user)
    const email = "michael@gamil.com"
    // ,{ params: { email: user } }


    /*useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.post("/api/profile/admin", {user})
            console.log('HERE: ', data)
        }
        fetchData()
    }, [])*/
//    console.log("photo",users.map((user) => (user.profileimg)))
    return (

        <div style={{paddingTop: 56}}>

            {currentUser.isAdmin ? (
                <p>You are admin!</p>
            ) : (
                <p>404</p>
            )}
            <Box display="flex" alignItems="center" justifyContent="center">
                <Grid container style={{maxWidth: 1400}}>
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} key={user._id}>
                            <Container maxWidth="false" sx={{width: 330, my: 3}}>
                                <form>
                                    <p>{user.email}</p>
                                    <br></br>
                                    <img className="activator" style={{width: '100%', height: 300}}
                                         src={user.profileimg}/>
                                    <br></br>
                                </form>
                                {/* <IndexCard id={user._id} title={user.email} content={user.password} /> */}
                            </Container>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {/* <Grid
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
            </Grid> */}
        </div>
    )
        ;

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

    let currentUser = await User.findOne({email: email}).lean()
    currentUser._id = currentUser._id.toString()

    return {props: {users: users, currentUser}}
}