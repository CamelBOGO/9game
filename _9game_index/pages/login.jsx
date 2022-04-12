import {useState} from "react"
import axios from "axios"
import cookies from "js-cookie"

import {useRouter} from "next/router";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded"
import {Grid, Paper, Avatar, FormControl, TextField, Link} from "@mui/material";

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

        if (status == "error") {
            alert(data.message)
        } else {
            cookies.set("email", data?.email)
            cookies.set("token", data?.accessToken)
            //alert(data.message)
            router.push("/")
        }
    }

    const paperStyle = {padding: 15, minHeight:"65vh", width: 300, margin:"50px auto", borderRadius: "25px"}
    const avatarStyle = {backgroundColor: "#212121"}
    const buttonStyle = {margin:"25px", width: 250, height: "50px", border: "1px solid", background: "#212121", borderRadius: "25px", "font-size": "18px", "color": "#e9f4fb"}
    return (
        <Grid align = "center" celled padded style={{fontFamily: "sans-serif", minHeight: "92vh"}}>
            <style>{"body { background-image: linear-gradient(315deg, #000000 0%, #ffffff 74%);}"}</style>
            <Paper elevation={20} style={paperStyle}>
                <div style={{margin:"30px auto"}}>
                    <Avatar style={avatarStyle}><VpnKeyRoundedIcon/></Avatar>
                    <h2>Login</h2>
                </div>

                <form onSubmit={SubmitHandler}>
                    <FormControl style={{margin:"0px auto", width:250}}>
                        <TextField value={email} onChange={e => setEmail(e.target.value) }
                            type="email"
                            label="Email"
                            margin="dense"
                            fullWidth required/>
                    </FormControl>
                    <br/>

                    <FormControl style={{margin:"5px auto", width:250}}>
                        <TextField value={password} onChange={e => setPassword(e.target.value)}
                            type="password"
                            label="Password"
                            margin="dense"
                            fullWidth required/>
                    </FormControl>
                    <br/>

                    <button type="submit" style={buttonStyle}>Login</button>
                    <br/>
                </form>

                <Grid align = "center" style={{margin:"20px auto"}}>
                    <Link href="/forget" sx={{mx: 3}} style={{textDecoration: "none"}}>Forget Password? </Link>
                    <Link href="/register" sx={{mx: 3}} style={{textDecoration: "none"}}> Sign Up </Link>
                </Grid>
                    
            </Paper>
        </Grid>
    )
}

export default Register