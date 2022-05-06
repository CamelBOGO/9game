/**
 * Header Comment Block: what, who, where, when, why, how
 * Post Popup Module
 * Programmer: Fong Sze Chung, Yu Sun Leung
 * The post popup module called by user when the user clicking on the post card on the cover page.
 * Version: 2, Date: 2022-05-05
 * Purpose: Handle the popup event for the user to see the detailed post content including
 *          comments, and likes.
 * Data Stucture:
 *          String:     currentuser
 *                      postcontent
 *                      postuser
 *          Integer:    postlikes
 *          Boolean:    init        (initital state of the like button)
 *                      checked     (for like button)
 *                      likestate   (for like button)
 *          ObjectId:   postid
 *          Object:     likebut     
 *                      form
 *          Array:      postcomment
 * Algorithm:
 *          Rendering Function:
 *              Receive props
 *              Create a function to handle comment form submit
 *              Create a function to handle comment form changes
 *              Create a useEffect hook to handle the like button state changes
 *              Return post popup rendering
 */

import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    Typography,
    Card
} from "@mui/material";
import Like from '../likePost/like_post';

export default function PostPopUp(props) {
    // Variables used in this module
    const currentuser = props.currentuser
    const postid = props.id
    const postcontent = props.content
    const postcomment = props.comnts
    const postuser = props.user
    const postlikes = props.likes
    const setCheck = props.setcheck
    const checked = props.checked
    const likebut = <Like id={postid} email={currentuser} checked={checked} setCheck={setCheck}
                          style={{margin: 0, zIndex: 5}}/>
    const [likestate, setlike] = useState(postlikes)
    const [init, setinit] = useState(false)
    const [form, setForm] = useState({
        post_id: postid,
        user_id: currentuser,
        date: new Date(),
        text: "",
    })
    const [comnts, setComnts] = useState({data: postcomment.data})

    // useEffect handle the like button state changing
    useEffect(() => {
        let newlike = likestate
        let localcheck = likebut.props.checked
        if (init) {
            if (localcheck) {
                newlike++
                setlike(newlike)
            }
            if (!localcheck) {
                newlike--
                setlike(newlike)
            }
        }
        setCheck(localcheck)
        setinit(true)
    }, [likebut.props.checked]);

    // Function: Handle submission of a new comment
    const handleSubmit = async function (e) {
        e.preventDefault()
        // Here I show you how to post data by calling api.
        // If the user has logged in
        if (currentuser) {
            // Try to create a new comment for the corresponding post
            try {
                const res = await fetch('/api/comnt', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })
                if (!res.ok) {
                    throw new Error(res.status)
                }
            } catch (error) {
                console.error(error)
                console.log("Fail to upload!")
            }
            
            // Try to fetch the new comment list from the database
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

                // If fetching is successful
                const data = await res.json()
                // Update the comment list in the current post popup window
                setComnts({
                    ...comnts,
                    data: data.data,
                })
            } catch (error) {
                console.error(error)
            }
        }
    }

    // Function: Handle comment form input changes
    const handleChange = async function (e) {
        const value = e.target.value
        const name = e.target.name

        setForm({
            ...form,
            [name]: value,
            date: new Date(),
        })
    }

    // Rendering
    return (
        <>
            <Box Container>
                {/* Post content and author of the post will be shown in this part */}
                <Typography gutterBottom variant="body1"
                            component="div"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '12',
                                WebkitBoxOrient: 'vertical',
                            }}>
                    {postcontent}
                </Typography>
                <Typography>Author: {postuser}</Typography>
            </Box>

            <Box style={{display: "inline-flex"}}>
                {/* Like button and the total Likes of the post*/}
                {likebut}
                <Typography variant="h6"
                            direction="row"
                            alignItems="center"
                            justifyContent="left"
                            sx={{px: 1}}
                            style={{display: "flex"}}>
                    {likestate}
                </Typography>
            </Box>

            <hr/>
            
            {/* Check the user has logged in */}
            {currentuser ?
                <form onSubmit={handleSubmit}>
                    {/* Shows the user the comment input form if the user has logged in */}
                    <FormControl>
                        <InputLabel htmlFor="text">Content</InputLabel>
                        <Input
                            type="text"
                            name="text"
                            autoComplete="off"
                            multiline
                            onChange={handleChange}
                            required
                            sx={{mb: 2}}
                        />
                    </FormControl>
                    <br/>
                    <Button type="submit">Comment</Button>
                </form>
                : ""}

            <Box>
                {/* Comment card generation by mapping the data of comment into one card
                    and showing as a list*/}
                {comnts.data.map((comnt) => (
                    <Card key={comnt._id} style={{margin: "0.5rem"}}>
                        <Typography style={{justifyContent: "space-between"}}>   
                            {comnt.user_id}: {comnt.date}
                        </Typography>
                        <Typography style={{marginLeft: "1rem", wordWrap: "break-word"}}>
                            {comnt.text}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </>
    );
}