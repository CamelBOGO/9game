/**
 * Header Comment Block: what, who, where, when, why, how
 * Index Page
 * Programmer: Yu Sun Leung
 * The default page called by server when user entering.
 * Version: 12, Date: 2022-05-05
 * Purpose: Generate an index page for visitor or logged-in user.
 * Data Structure:
 *      Boolean: isOpen (for popup window)
 *      String: scroll (indicating scrolling mode)
 *
 * Algorithm:
 *      Get Serverside Props:
 *          Connect DB.
 *          If no data in DB, create a sample data.
 *          Get all post by calling API.
 *          Check login.
 *          Return all post and login status by props.
 *
 *      Rendering Function:
 *          Receive props.
 *          Create a function to handle popup opening.
 *          Create a function to handle popup closing.
 *          Create a function for logout.
 *          Return index page rendering.
 */

import Head from "next/head"
import "@fontsource/roboto"
import {useState} from "react";
import {Button, AppBar, Toolbar, Typography, Grid, Box, Container, Dialog, DialogContent} from "@mui/material";

import IndexCard from "../components/card";
import dbConnect from "../lib/dbConnect";
import post_model from "../db_models/post_model";
import NewPost from "../components/newPost/new_post";

import {parseCookies, destroyCookie} from "nookies";

export default function Home({posts, user}) {
    // Define variable to store the status for popup.
    // 1. Status of popup.
    const [open, setOpen] = useState(false)
    // 2. Status of scrolling mode.
    const [scroll, setScroll] = useState('body')

    // Function: Handle popup opening.
    const handleClickOpen = (scrollType) => () => {
        // Update the status of popup opening and scrolling mode.
        setOpen(true)
        setScroll(scrollType)
    }

    // Function: Handle popup closing.
    const handleClose = () => {
        // Update the status of popup opening.
        setOpen(false)
    }

    // Function: Logout.
    const logout = async function () {
        // Simply delete the login cookies.
        destroyCookie(null, 'token')
        destroyCookie(null, 'email')
        // Force reload.
        window.location.reload()
    }

    // Render the HTML code.
    return (
        <div style={{paddingTop: 56}}>
            <Head>
                <title>9Game</title>
            </Head>

            {/*App Bar*/}
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" color="common.white" sx={{flexGrow: 1}}>
                        9Game
                    </Typography>

                    {/*Different components will show according to login status.*/}
                    {user ? (
                        // Render this when it is logged-in.
                        <>
                            <Button
                                color="secondary"
                                sx={{mr: 2}}
                                onClick={handleClickOpen('body')}
                            >New Post</Button>
                            <Button color="secondary" sx={{mr: 2}} href="/profile">My Profile</Button>
                            <Button color="secondary" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        // Render thsi when it is NOT logged-in.
                        <Button color="secondary" href="/login">Login</Button>
                    )}
                </Toolbar>
            </AppBar>

            {/*Welcome String; different strings will show according to login status.*/}
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="h4"
                    sx={{
                        m: 3,
                        mt: 5
                    }}>{user ? "Welcome! " + user.toString() : "Press LOGIN button to login."}</Typography>
            </Grid>

            {/*Popup Window*/}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers={scroll === 'paper'}>
                    <NewPost email={user}/>
                </DialogContent>
            </Dialog>

            {/*Main Content: Post Cards (in grid style)*/}
            <Box display="flex" alignItems="center" justifyContent="center">
                <Grid container style={{maxWidth: 700}}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} key={post._id}>
                            <Container maxWidth="false"
                                       style={{padding: 0, width: 300, marginTop: 10, marginBottom: 10}}>
                                <IndexCard container id={post._id} title={post.title} content={post.content}
                                           date={post.postdate} user={post.username} likes={post.likes}
                                           likeduser={post.likeduser} currentuser={user}/>
                            </Container>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

// A server function which will run for every client request.
// It will run before the main functions.
export async function getServerSideProps(props) {
    try {
        // Try to connect the DB.
        await dbConnect()

        // If success, check if there is any post data in DB.
        post_model.find({}, function (err, post) {
            // Create a sample data if no data inside.
            if (!post.length) {
                console.log("Post not found!")
                post = new post_model({
                    title: "CS1.6",
                    content: "CS1.6 is one of my favourite game. It was released in 1999 and laid the foundation of FPS e-sporting games. (This data is read from database.)",
                    postdate: new Date(),
                    username: "Admin",
                    likes: 1000
                })

                // Upload sample data.
                post.save()
            }
        })
    } catch (e) {
        // If it cannot connect to DB, output log to console by using error flag.
        console.error(e)
    }

    // Fetch all post from DB.
    const result = await post_model.find().sort({postdate: "desc"})
    // Convert all datatype from DB datatype to a type that JS can support.
    const posts = result.map((doc) => {
        const post = doc.toObject()
        post._id = post._id.toString()
        post.postdate = post.postdate.toDateString()
        return post
    })

    // Check login status by cookies.
    const cookies = parseCookies(props)
    // Identify user.
    const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null

    // Return all post and login status by props.
    return {props: {posts, user}}
}
