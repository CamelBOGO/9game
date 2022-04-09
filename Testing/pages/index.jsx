import Head from "next/head"
import Link from "next/link"
import "@fontsource/roboto"
import {useState} from "react";
import {Button, AppBar, Toolbar, Typography, Grid, Box, Container} from "@mui/material";

import IndexCard from "../components/card";
import dbConnect from "../lib/dbConnect";
import post_model from "../db_models/post_model";
import NewPost from "./new_post";
import NewPostPopUp from "../components/newPost/new_post_popup"

export default function Home({isConnected, posts}) {
    const [visibility, setVisibility] = useState(false);
    const [likedPosts, updateLikedPosts] = useState([]);

    const popupCloseHandler = () => {
        setVisibility(false);
    }

    return (
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
                {isConnected ? (
                    <Typography variant="h4">MongoDB connected.</Typography>
                ) : (
                    <Typography variant="h4">MongoDB NOT connected.</Typography>
                )}
                <Typography variant="h4">Hello, World!</Typography>
                <Button onClick={() => setVisibility(true)}>New Post</Button>
            </Grid>

            <NewPostPopUp
                display="flex"
                show={visibility}
                onClose={popupCloseHandler}>
                <NewPost onClose={popupCloseHandler}/>
            </NewPostPopUp>

            <Box display="flex" alignItems="center" justifyContent="center">
                <Grid container style={{maxWidth: 700}}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} key={post._id}>
                            <Container maxWidth="false" sx={{width: 330, my: 2}}>
                                <IndexCard id={post._id} title={post.title} content={post.content} date={post.postdate}
                                           user={post.username}
                                           likes={post.likes} updateLikedPosts={updateLikedPosts}
                                           likedPosts={likedPosts} likeduser={post.likeduser}/>
                            </Container>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export async function getServerSideProps() {
    let isConnected = true
    try {
        await dbConnect()
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
                post.save() // You can upload it directly.*/
            }
        })
    } catch (e) {
        console.error(e)
        isConnected = false
    }

    const result = await post_model.find({})
    const posts = result.map((doc) => {
        const post = doc.toObject()
        post._id = post._id.toString()
        post.postdate = post.postdate.toDateString()
        return post
    })

    return {props: {isConnected: isConnected, posts: posts}}
}
