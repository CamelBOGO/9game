import {useState} from "react";
import {useRouter} from "next/router";
import {Grid, FormControl, InputLabel, Input, Button} from "@mui/material";

export default function NewPost(props) {
    const router = useRouter()
    const [form, setForm] = useState({
        title: "",
        content: "",
    })

    const handleSubmit = async function (e) {
        e.preventDefault()

        try {
            const res = await fetch('/api/post', {
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
            props.onClose(false);
            window.location.reload();
        } catch (error) {
            console.error(error)
            console.log("Fail to upload!")
        }
    }

    const handleChange = async function (e) {
        const value = e.target.value
        const name = e.target.name

        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <>
            <Grid
                container
                sx={{pt: 2}}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <Input
                            type="text"
                            maxLength="30"
                            name="title"
                            autoComplete="off"
                            multiline
                            onChange={handleChange}
                            required
                            sx={{mb: 2, width: 300}}
                        />
                    </FormControl>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="content">Content</InputLabel>
                        <Input
                            type="text"
                            name="content"
                            autoComplete="off"
                            multiline
                            rows={6}
                            onChange={handleChange}
                            required
                            sx={{mb: 2, width: 300}}
                        />
                    </FormControl>
                    <br/>
                    <Button type="submit">Submit</Button>
                </form>
            </Grid>
        </>
    )
}