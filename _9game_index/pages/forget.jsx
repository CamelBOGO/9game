import { useState } from 'react'
import axios from 'axios'

import {useRouter} from "next/router";
import styles from "../styles/authstyle.module.css"
import {FormControl, Grid, TextField, Typography, Card, Link} from "@mui/material";


const forget = () => {
    const [email,setEmail] = useState("")
    const router = useRouter()
    
    const SubmitHandler = async(e) => {
        e.preventDefault()

        //console.log(email, password)
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/forget", { email }, config)
        const status = data.status
        const message = data.message

        if(status == "error"){
            alert(data.message)
        } else {
            alert(data.message)
            router.push("/login")
        }

    }
    return (
        <div className={styles.body}>
            <Grid
                container
                sx={{pt: 2}}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Card sx={{width: 400, height: 300, boxShadow: 10}}>
                    <Grid
                        container
                        sx={{pt: 2}}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >

                        <Typography variant="h3" sx={{mt: 2}}>Forget</Typography>

                        <form className={styles.form} onSubmit={SubmitHandler}>
                            <Grid
                                container
                                sx={{pt: 2}}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <FormControl>
                                    <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email"
                                               autoComplete="off"
                                               margin="dense" sx={{width: 300}}/>
                                </FormControl>
                                <br/>

                                <button className={styles.button} type="submit">Submit</button>
                                <br/>
                                
                                <Link href="/login" sx={{mx: 3}}>Already has an account?</Link>

                            </Grid>
                        </form>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
}

export default forget