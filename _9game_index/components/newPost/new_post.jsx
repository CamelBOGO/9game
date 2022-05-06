/**
 * Header Comment Block: what, who, where, when, why, how
 * Post Create Module
 * Programmer: Fong Sze Chung, Yu Sun Leung
 * The post create module called by user when the user clicking the new post button on the toolbar on the cover page
 * Version: 2, Date: 2022-05-05
 * Purpose: Generate a popup window for user to create a new post instead of redirect to a new page, which
 * can reduce the loading time of the page and also enhance the user experience with a smooth animation of a 
 * small popup window
 * Data Stucture:
 *      String: email   (current username)
 *      Object: form    (grouping paramters for a new post)
 * Algorithm:
 *      Rendering Function:
 *          Receive props
 *          Create a function to handle form submission
 *          Create a function to handle form changes
 *          Return create post popup rendering
 */

import {useState} from "react";
import {Grid, FormControl, InputLabel, Input, Button, Typography} from "@mui/material";

export default function NewPost(props) {
    // Variables used in this module
    const email = props.email

    const [form, setForm] = useState({
        title: "",
        content: "",
        username: email,
        postdate: new Date(),
        likes: 0,
        likeduser: [],
    })

    // Function: Handle form submit
    const handleSubmit = async function (e) {
        e.preventDefault()
        try {
            const res = await fetch('/api/post/', {
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
            window.location.reload();
        } catch (error) {
            console.error(error)
            console.log("Fail to upload!")
        }
    }

    // Function: Handle form changes
    const handleChange = async function (e) {
        const value = e.target.value
        const name = e.target.name

        setForm({
            ...form,
            [name]: value,
        })
    }

    // Rendering
    return (
        <>
            <Grid
                container
                sx={{pt: 2}}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography>New post by {email}</Typography>
                {/* Input form of the content required to create a new post */}
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <Input
                            type="text"
                            name="title"
                            autoComplete="off"
                            fullWidth
                            multiline
                            onChange={handleChange}
                            required
                            sx={{mb: 2}}
                        />
                    </FormControl>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="content">Content</InputLabel>
                        <Input
                            type="text"
                            name="content"
                            autoComplete="off"
                            fullWidth
                            multiline
                            rows={6}
                            onChange={handleChange}
                            required
                            sx={{mb: 2}}
                        />
                    </FormControl>
                    <br/>
                    <Button type="submit">Submit</Button>
                </form>
            </Grid>
        </>
    )
}
