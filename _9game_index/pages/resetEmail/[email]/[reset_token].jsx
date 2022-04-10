import { useState } from 'react'
import axios from 'axios'
import React from 'react'

import {useRouter} from "next/router";
import styles from "../../../styles/authstyle.module.css"
import {FormControl, Grid, TextField, Typography, Card, Link} from "@mui/material";


const Reset = () => {
    const [password,setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const router = useRouter()

    const SubmitHandler = async(e) => {

        const email = router.query["email"]
        const r_token = router.query["reset_token"]
        const essential= {"email": email, "r_token": r_token}
        console.log(essential)
    
        e.preventDefault()

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/reset", { password, confirmPassword, essential }, config)

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
                <Card sx={{width: 400, height: 400, boxShadow: 10}}>
                    <Grid
                        container
                        sx={{pt: 2}}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h3" sx={{mt: 2}}>Reset</Typography>
                        <form className={styles.form} onSubmit={SubmitHandler}>
                            <Grid
                                container
                                sx={{pt: 2}}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <FormControl>
                                    <TextField value={password} onChange={e => setPassword(e.target.value)}
                                               type="password"
                                               label="Password"
                                               margin="dense" sx={{width: 300}}/>
                                </FormControl>
                                <br/>

                                <FormControl>
                                    <TextField value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)}
                                               type="password"
                                               label="Confirm Password"
                                               margin="dense" sx={{width: 300}}/>
                                </FormControl>
                                <br/>

                                <button className={styles.button} type="submit">Login</button>
                            </Grid>
                        </form>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
}

export default Reset