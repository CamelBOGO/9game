import {useRouter} from "next/router";
import Post from "../../../db_models/post_model";
import Comnt from "../../../db_models/comnt_model";
import {Button, FormControl, Input, InputLabel, TextField, Typography} from "@mui/material";
import {useState} from "react";
import dbConnect from "../../../lib/dbConnect";
import styles from  "../../../styles/indexcard.module.css"
import { height } from "@mui/system";
import Like from "../../../components/like_post"

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

    
    const likeduser = post.likeduser
    const currentuser = post.currentuser
    const check = (likeduser?.includes(currentuser)) ? true : false

    return (
         <> 
                    <div className ={styles.body}>     
                        <div className ={styles.container }>
                             <div className ={styles.box1}>

                                            <div className ={styles.box2}>
                                            <Typography variant="h4">{post.title.toString()}</Typography>
                                            </div>

                                            <div className ={styles.box3}>
                                            <br></br>
                                                <Typography>{post.content.toString()}</Typography>
                                                
                                            </div>

                                        <br></br>

                                            <div className ={styles.box4}>
                                            <form onSubmit={handleSubmit}>
                                            <br></br>
                                                    <FormControl>
                                                        <InputLabel htmlFor="text" >Content</InputLabel>
                                                        <Input
                                                            type="text"
                                                            name="text"
                                                            autoComplete="off"
                                                            multiline
                                                            rows={2}
                                                            onChange={handleChange}
                                                            required
                                                            sx={{mb: 2, width: 660}}
                                                        />
                                                    </FormControl>
                                                    <br></br>
                                                    <br></br>
                                                    <Button className={styles.button} type="submit">Comment</Button>
                                                    
                                                            <span>
                                                            <Like id={post.id} likes={post.likes}
                                                                likeduser={post.likeduser}
                                                                email={post.currentuser} checked={check}/>
                                                            </span>    
                                                    
                                                </form>
                                            </div>

                                            <br></br>

                                            <div className ={styles.box6}>
                                                <Typography variant="h5">User comment:</Typography>
                                            </div>  

                                            <br></br>
                                            
                                            <div className ={styles.box5}>

                                                <ul>
                                                {comnts.map((comnt) => (
                                                        <Typography key={comnt._id}>
                                                                    Comment:{comnt.text.toString()} 
                                                                    <div class="combox">
                                                                            <span class="userID">
                                                                            </span>
                                                                            <span class="Date"> Date: {comnt.date.toString()}</span>
                                                                    </div>              
                                                        </Typography>
                                                    ))}
                                                </ul>     

                                            </div>
                                 </div>            
                            
                        </div>
                    </div>

        
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