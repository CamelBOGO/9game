import { useState } from 'react'
import axios from 'axios'

import {useRouter} from "next/router";
import styles from "../styles/authstyle.module.css"
import {FormControl, Grid, TextField, Typography, Card, Link} from "@mui/material";


const Register = () => {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const SubmitHandler = async(e) => {
        e.preventDefault()

        //console.log(email, password)
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/register", { email, password, confirmPassword }, config)
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
                <Card sx={{width: 400, height: 500, boxShadow: 10}}>
                    <Grid
                            container
                            sx={{pt: 2}}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="h3" sx={{mt: 2}}>Register</Typography>

                            <form className={styles.form} onSubmit={SubmitHandler}>
                                <Grid
                                    container
                                    sx={{pt: 2}}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <FormControl>
                                        <TextField value={email} onChange={e => setEmail(e.target.value)} 
                                                type="email"
                                                label="email"
                                                autoComplete="off"
                                                margin="dense" sx={{width: 300}}/>
                                    </FormControl>
                                    <br/>

                                    <FormControl>
                                        <TextField value={password} onChange={e => setPassword(e.target.value)} 
                                                type="password"
                                                label="Password"
                                                margin="dense" sx={{width: 300}}/>
                                    </FormControl>
                                    <br/>

                                    <FormControl>
                                        <TextField value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} 
                                                type="password"
                                                label="Confirm Password"
                                                margin="dense" sx={{width: 300}}/>
                                    </FormControl>
                                    <br/>

                                    <button className={styles.button} type="submit">Register</button>
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

export default Register