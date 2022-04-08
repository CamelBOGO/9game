import {useRouter} from "next/router";
import Post from "../../../db_models/post_model";
import Comnt from "../../../db_models/comnt_model";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useState} from "react";
import dbConnect from "../../../lib/dbConnect";

export default function ({post, comnts}) {
    const router = useRouter()
    const [form, setForm] = useState({
        post_id: post._id.toString(),
        user_id: "user8964",
        date: new Date(),
        text: "",
    })

    const handleSubmit = async function (e) {
        e.preventDefault()
        // Here I show you how to post data by calling api.
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
            <Typography variant="h4">{post.title.toString()}</Typography>
            <Typography>{post.content.toString()}</Typography>

            <form onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="text">Content</InputLabel>
                    <Input
                        type="text"
                        name="text"
                        autoComplete="off"
                        multiline
                        rows={2}
                        onChange={handleChange}
                        required
                        sx={{mb: 2}}
                    />
                </FormControl>
                <br/>
                <Button type="submit">Comment</Button>
            </form>

            {comnts.map((comnt) => (
                <Typography>Comment: {comnt.text.toString()} /{comnt.date.toString()}</Typography>
            ))}
        </>
    )
}

export async function getServerSideProps(context) {
    await dbConnect()
    const {id} = context.query

    // Here I show you how to fetch data in script,
    // but you can also call api to help you.
    let post = await Post.findById(id).lean()
    post._id = post._id.toString()

    const comntsResult = await Comnt.find({post_id: id.toString()})
    const comnts = comntsResult.map((doc) => {
        const comnt = doc.toObject()
        comnt._id = comnt._id.toString()
        comnt.date = comnt.date.toDateString()
        return comnt
    })

    return {props: {post: post, comnts: comnts}}
}