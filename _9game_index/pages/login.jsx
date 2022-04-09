import {useState} from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import {useRouter} from "next/router";

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
        cookies.set('email', data.email)
        cookies.set('token', data.accessToken)
        console.log(data)
        router.push("/")
    }
    return (
        <div>
            <form onSubmit={SubmitHandler}>
                <h1>Login</h1>
                <input value={email} onChange={e => setEmail(e.target.value)}/>
                <input value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Register