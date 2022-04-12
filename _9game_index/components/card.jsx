import {Card, CardActionArea, CardContent, CardMedia, Container} from "@mui/material"
import {Box, Typography} from "@mui/material"
import {makeStyles} from "@material-ui/styles"
import Like from "./likePost/like_post"
import React, {useState} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PostPopUp from "./commentPost/comment_post";

export default function IndexCard(props) {
    const [comnts, setComnts] = useState({data: []})
    const currentuser           = props.currentuser

    const postid                = props.id
    const postdate              = props.postdate
    const postlikes             = props.likes
    const postlikeduser         = props.likeduser
    const posttitle             = props.title
    const postcontent           = props.content 
    const postuser              = props.username

    const check = (postlikeduser?.includes(currentuser)) ? true : false
    const [checked, setCheck] = useState(check)

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

    ///// popup /////
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');

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
    
    const handleClose = () => {
        setOpen(false);
    };
    ////////////////

    return (
        <Card sx={{width: 300, height: 400, boxShadow: 5}}>
            {/* <CardActionArea href={`/post/${props.id}/comnt`}> */}
            <CardActionArea onClick={handleClickOpen('paper')}>
                <Box component="div" sx={{height: 300, p: 2}} style={{top: "0", width: "auto"}}>
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

                <Box component="div"
                     direction="row"
                     alignItems="center"
                     justifyContent="left"
                     fullHeight
                     sx={{height: 68, px: 1}}
                     style={{display: "flex"}}
                >
                    {currentuser?
                    <Like   id={postid} email={currentuser} checked={checked} setCheck={setCheck}
                            style={{margin:0, zIndex: 5}}/>
                    :""}
                    <Typography noWrap variant="h5" component="div" style={{marginLeft: "0.5rem"}} sx={{my: 1}}>
                        {posttitle}
                    </Typography>
                </Box>
            </CardActionArea>
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
                    <PostPopUp id={postid} content={postcontent} checked={check} setCheck={setCheck} comment={comnts}
                        date={postdate} user={postuser} currentuser={currentuser} likes={postlikes}/>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export async function getServerSideProps(context) {
    await dbConnect()
    const {id} = context.query

    // Here I show you how to fetch data in script, //<Typography key={props._id}>Comment: {props.text} / {props.date}</Typography>
    // but you can also call api to help you.

    let post = await Post.findById(id).lean()
    post._id = post._id.toString()
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