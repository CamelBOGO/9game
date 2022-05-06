/**
 * Header Comment Block: what, who, where, when, why, how
 * Post Popup Module
 * Programmer: Fong Sze Chung, Yu Sun Leung
 * The post popup module called by user when the user clicking on the post card on the cover page.
 * Version: 2, Date: 2022-05-05
 * Purpose: Handle the popup event for the user to see the detailed post content including
 *          comments, and likes.
 * Data Stucture:
 * Variable currentuser - string
 *          postid      - mongodb ObjectId
 *          postcontent - string
 *          postuser    - string
 *          postlikes   - integer
 *          setCheck    - function handler passed by parent
 *          checked     - state
 *          likebut     - Object of like button
 *          likestate   - state of like button
 *          init        - initial state of like button
 *          form        - Object of a post consists of postid, content, date, and text
 * Array    postcomment - Object array
 * Algorithm:
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

    const handleSubmit = async function (e) {
        e.preventDefault()
        // Here I show you how to post data by calling api.
        if (currentuser) {
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
        }
    }

    const handleChange = async function (e) {
        const value = e.target.value
        const name = e.target.name

        setForm({
            ...form,
            [name]: value,
            date: new Date(),
        })
    }

    return (
        <>
            <Box Container>
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

            {currentuser ?
                <form onSubmit={handleSubmit}>
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