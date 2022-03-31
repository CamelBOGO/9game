import Head from "next/head"
import Link from "next/link"
import "@fontsource/roboto"
import {Button, AppBar, Toolbar, Typography, Grid} from "@mui/material";

import IndexCard from "../components/card";
import dbConnect from "../lib/dbConnect";
import post_model from "../db_models/post_model";

export default function Home({isConnected, posts}) {
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
                spaceing={0}
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
                <Button href="\new_post">New Post</Button>
                {posts.map((post) => (
                    <IndexCard key={post._id} title={post.title} content={post.content}></IndexCard>
                ))}
            </Grid>

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
                    content: "CS1.6 is one of my favourite game. It was released in 1999 and laid the foundation of FPS e-sporting games. (This data is read from database.)"
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
        return post
    })

    return {props: {isConnected: isConnected, posts: posts}}
}
