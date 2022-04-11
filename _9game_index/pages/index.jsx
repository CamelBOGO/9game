import Head from "next/head"
import Link from "next/link"
import "@fontsource/roboto"
import {useState} from "react";
import {Button, AppBar, Toolbar, Typography, Grid, Box, Container} from "@mui/material";

import IndexCard from "../components/card";
import dbConnect from "../lib/dbConnect";
import post_model from "../db_models/post_model";
import NewPost from "../components/newPost/new_post";
import NewPostPopUp from "../components/newPost/new_post_popup"

import {parseCookies, destroyCookie} from "nookies";
import Post1 from "./card_postpopup";

export default function Home({isConnected, posts, user}) {
    const [visibility1, setVisibility1] = useState(false);
    const [likedPosts, updateLikedPosts] = useState([]);

    const popupCloseHandler = () => {
        setVisibility1(false);
    }

    const logout = async function () {
        destroyCookie(null, 'token')
        destroyCookie(null, 'email')
        window.location.reload();
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

                    {user ? (
                        <>
                            <Button
                                color="secondary"
                                sx={{mr: 2}}
                                onClick={() => setVisibility1(true)}
                            >New Post</Button>
                            <Button color="secondary" sx={{mr: 2}} href="/profile">My Profile</Button>
                            <Button color="secondary" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="secondary" href="/login">Login</Button>
                    )}
                </Toolbar>
            </AppBar>

            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >

                {/*<Typography variant="h4">{isConnected ? "MongoDB connected." : "MongoDB NOT connected."}</Typography>*/}

                <Typography
                    variant="h4"
                    sx={{m: 3, mt: 5}}>{user ? "Welcome! " + user.toString() : "Press LOGIN button to login."}</Typography>

            </Grid>

            <NewPostPopUp
                display="flex"
                show={visibility1}
                onClose={popupCloseHandler}>
                <NewPost email={user} onClose={popupCloseHandler}/>
            </NewPostPopUp>

            <Box display="flex" alignItems="center" justifyContent="center">
                <Grid container style={{maxWidth: 700}}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} key={post._id}>
                            <Container maxWidth="false" sx={{width: 330, my: 3}}>
                                <IndexCard id={post._id} title={post.title} content={post.content}
                                            date={post.postdate} user={post.username} likes={post.likes}
                                            likeduser={post.likeduser} currentuser={user} />

                                            <Post1 id={post._id} title={post.title} content={post.content} date={post.postdate}
                                                                user={post.username}
                                                                likes={post.likes} updateLikedPosts={updateLikedPosts}
                                                                likedPosts={likedPosts} likeduser={post.likeduser} >
                                            </Post1>
                                            
                            </Container>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export async function getServerSideProps(props) {
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

    const cookies = parseCookies(props)
    const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null

    return {props: {isConnected: isConnected, posts: posts, user: user}}
}
