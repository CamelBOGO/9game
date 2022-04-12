import React, {useState, useEffect, useRef} from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    Typography
} from "@mui/material";
import Like from "../likePost/like_post"
import {useRouter} from "next/router";

export default function PostPopUp(props) {
    const currentuser       = props.currentuser

    const postid            = props.id
    const postcontent       = props.content
    const postcomments      = props.comment
    const postdate          = props.date
    const postuser          = props.user

    const check             = props.checked
    const [form, setForm] = useState({
        post_id: postid,
        user_id: currentuser,
        date: new Date(),
        text: "",
    })

    const router = useRouter();

    const handleSubmit = async function (e) {
        e.preventDefault()
        // Here I show you how to post data by calling api.
        if (currentuser){
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
                router.reload()
            } catch (error) {
                console.error(error)
                console.log("Fail to upload!")
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
                    <Typography>{postuser}</Typography>
                    <Typography>{postdate}</Typography>
                    {postcontent}
            </Typography>
        </Box>
        <Box Container>
            {/* <Like   id={postid} email={currentuser} checked={check} setCheck={props.setCheck} style={{position: "sticky", left: 0}}/> */}
            <Typography>
                {postdate}
            </Typography>
        </Box>

        {currentuser?
            <Grid>
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

                {postcomments.data.map((comnt) => (
                    <Typography
                        key={comnt._id}
                    >   
                        {comnt.user_id}: posted on {comnt.date}<br/>
                        <span style={{marginLeft: "1rem"}}>
                            {comnt.text}
                        </span>
                    </Typography>
                ))}
            </Grid>
        :""}
        
        </>
    );
}