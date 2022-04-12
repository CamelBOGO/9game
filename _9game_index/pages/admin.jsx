import Head from "next/head"
import {useEffect, useState} from 'react'
import axios from 'axios'
import {
    AppBar,
    Button,
    Toolbar,
    FormControl,
    Grid,
    TextField,
    Typography,
    Card,
    Box,
    Container,
    CardContent, CardMedia
} from "@mui/material";
import IndexCard from "../components/card";
import dbConnect from "../lib/dbConnect";
import User from "../db_models/user_model"
import cookies from 'nookies'
import {parseCookies} from 'nookies'
import {red} from "@mui/material/colors";


export default function admin({users, currentUser}) {
    // const cookies = parseCookies()
    // const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null
    // console.log("email:", user)
    // const email = "michael@gamil.com"
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
        <div>
            {currentUser ? (<>
                    {currentUser.isAdmin ? (
                        <div>
                            <Typography
                                variant="h4"
                                sx={{m: 3, mt: 5}}>Welcome! Admin</Typography>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Grid container style={{maxWidth: 1400}}>
                                    {users.map((user) => (
                                        <Grid item xs={12} sm={6} key={user._id}>
                                            <Container maxWidth="false" sx={{width: 330, my: 3}}>
                                                <Card sx={{width: 300, boxShadow: 5}}>
                                                    <CardMedia
                                                        component="img"
                                                        height="300"
                                                        image={user.profileimg}
                                                        alt="No profile picture."
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">
                                                            {user.email}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Container>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </div>
                    ) : (
                        <Typography>You should be here, please return.</Typography>
                    )}</>) :
                (<Typography>Please login first.</Typography>)}
        </div>
    )
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
    if (email) {
        let currentUser = await User.findOne({email: email}).lean()
        currentUser._id = currentUser._id.toString()
        return {props: {users: users, currentUser}}
    }


    return {props: {users: users, currentUser: null}}
}