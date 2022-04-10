import {useState} from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import {useRouter} from "next/router";
import styles from "../styles/authstyle.module.css"
import {FormControl, Grid, TextField, Typography, Card, Link} from "@mui/material";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const SubmitHandler = async (e) => {
        e.preventDefault()

        //console.log(email, password)
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post("/api/auth/login", {email, password}, config)

        const status = data.status
        const message = data.message
        if(status == "error"){
            alert(data.message)
        } else {
            cookies.set('email', data?.email)
            cookies.set('token', data?.accessToken)
            alert(data.message)
            router.push("/")
        }
    }

    return (
        <body className={styles.body}>
            <Grid
                container
                sx={{pt: 2}}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >

                <Card sx={{width: 400, height: 450, boxShadow: 10}}>
                    <Grid
                        container
                        sx={{pt: 2}}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >

                        <Typography variant="h3" sx={{mt: 2}}>Login</Typography>
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
                                <FormControl>
                                    <TextField value={password} onChange={e => setPassword(e.target.value)}
                                               type="password"
                                               label="Password"
                                               margin="dense"
                                               sx={{width: 300, mb: 5}}/>
                                </FormControl>

                                <button className={styles.button} type="submit">Login</button>
                            </Grid>
                        </form>
                    </Grid>

                    <Grid
                        container
                        sx={{pt: 5}}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Link href="/" sx={{mx: 3}}>Forget Password?</Link>
                        <Typography sx={{mx: 3}}>Sign Up</Typography>
                    </Grid>
                </Card>
            </Grid>
        </body>
    )
}

export default Register