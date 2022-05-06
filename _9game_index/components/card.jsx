/**
 * Header Comment Block: what, who, where, when, why, how
 * Post Card module
 * Programmer: Fong Sze Chung, Yu Sun Leung
 * The post card framework called by server when user entering the cover page.
 * Version: 2, Date: 2022-05-05
 * Purpose: Generate a structured post card item as an Ojbect to group the post elements
 * Data Stucture:
 *      String:     posttitle
 *                  postcontent
 *                  postuser
 *                  currentuser
 *                  scroll          (indicating scroll mode)
 *      Boolean:    init            (initial state of the like button)
 *                  check           (for indicating the state of the like button)
 *                  checked         (for indicating the state of the like button)
 *                  likestate       (for indicating the state of the like button)
 *                  open            (indicating post popup window)
 *      Date:       postdate
 *      Integer:    postlikes
 *      ObjectId:   postid          
 *      Object:     likebut         (like button)
 *      Array:      comnts          (Array of comments)
 *                  postlikeduser   (Array of users)
 * Algorithm:
 *      Get Serverside Props:
 *          Connect DB
 *          Get all comment by calling API
 *          Return all comments by props
 * 
 *      Rendering Function:
 *          Receive props
 *          Create a Styling block for styling the card design
 *          Create a useEffect to handle likke button state changes
 *          Create a function to handle popup opening
 *          Create a function to handle popup closing
 *          Return post card rendering
 */

import {Card, CardActionArea, CardContent, CardMedia, Container } from "@mui/material"
import {Box, Typography} from "@mui/material"
import {makeStyles} from "@material-ui/styles"
import Like from "./likePost/like_post"
import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PostPopUp from "./commentPost/comment_post";

export default function IndexCard(props) {
    // Variables used in this module
    const [comnts, setComnts] = useState({data: []})
    const [init, setinit] = useState(false)
    const currentuser           = props.currentuser

    const postid                = props.id
    const postdate              = props.postdate
    const postlikes             = props.likes
    const postlikeduser         = props.likeduser
    const posttitle             = props.title
    const postcontent           = props.content 
    const postuser              = props.user

    const check = (postlikeduser?.includes(currentuser)) ? true : false
    const [checked, setCheck] = useState(check)
    const [likestate, setlike] = useState(postlikes)
    let likebut = <Like id={postid} email={currentuser} checked={checked} setCheck={setCheck} style={{margin:0, zIndex: 5}}/>

    // Styling
    const cardTextStyle = makeStyles({
        textEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 12,
            "-webkit-box-orient": "vertical"
        }
    });
    const classes = cardTextStyle()
    const router = useRouter();

    // useEffect handle the like button state changing
    useEffect(() => {
        let newlike = likestate
        if (init) {
            if (checked) {
                newlike++
                setlike(newlike)
            } else {
                newlike--
                setlike(newlike)
            }
        }
        setinit(true)
    }, [checked])

    ///// popup /////
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');

    // Function: Handle popup opening
    const handleClickOpen = (scrollType) => async() => {
        try {
            console.log("NOW FETCH: " + props.id)
            const res = await fetch(`/api/post/${props.id}/comnt`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) {
                throw new Error(res.status)
            }

            const data = await res.json()
            setComnts({
                ...comnts,
                data: data.data,
            })
        } catch (error) {
            console.error(error)
        }

        setOpen(true);
        setScroll(scrollType);
    };
    
    // Function: Handle popup closing
    const handleClose = () => {
        setOpen(false);
        router.reload()
    };
    ////////////////

    //Rendering
    return (
        <Card sx={{width: 300, height: 400, boxShadow: 5}}>
            {/* Post Card framework */}
            {/* <CardActionArea href={`/post/${props.id}/comnt`}> */}
            <CardActionArea  onClick={handleClickOpen('paper')}>
                {/* Post Content */}
                <Box component="div" sx={{height: 300, p: 2}} style={{top: "0", width: "auto"}} > 
                    {/*<CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt={content}
                        sx={{m: 2}}
                    />*/}

                    <Typography gutterBottom variant="body1"
                                component="div"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '13',
                                    WebkitBoxOrient: 'vertical',
                                }}>
                        {postcontent}
                    </Typography>
                </Box>
                {/* Post title and like button */}
                <Box component="div"
                     direction="row"
                     alignItems="center"
                     justifyContent="left"
                     fullHeight
                     sx={{height: 68, px: 1}}
                     style={{display: "flex"}}
                >
                    {/* Check if the user has logged in */}
                    {currentuser?
                    // <Like   id={postid} email={currentuser} checked={checked} setCheck={setCheck}
                    //         style={{margin:0, zIndex: 5}}/>
                    likebut
                    :""}
                    <Typography noWrap variant="h5" component="div" style={{marginLeft: "0.5rem"}} sx={{my: 1}}>
                        {posttitle}
                    </Typography>
                </Box>
            </CardActionArea>

            {/* Post popup */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title"
                    style={{padding: "1rem"}}
                >
                    {posttitle}
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <PostPopUp id={postid} content={postcontent} comnts={comnts} checked={checked} setcheck={setCheck}
                        date={postdate} user={postuser} currentuser={currentuser} likes={likestate}/>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export async function getServerSideProps(context) {
    // Connect the DB
    await dbConnect()
    const {id} = context.query

    let post = await Post.findById(id).lean()
    post._id = post._id.toString()
    post.postdate = post.postdate.toString()

    // Fetch all comments from DB
    const comntsResult = await Comnt.find({post_id: id.toString()})
    const comnts = comntsResult.map((doc) => {
        const comnt = doc.toObject()
        comnt._id = comnt._id.toString()
        comnt.date = comnt.date.toDateString()
        return comnt
    })

    // Return all comments by props
    return {props: {post: post, comnts: comnts}}
}