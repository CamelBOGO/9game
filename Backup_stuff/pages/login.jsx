import { useState } from 'react'
import axios from 'axios'


const Register = () => {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const SubmitHandler = async(e) => {
        e.preventDefault()

        //console.log(email, password)
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/login", { email, password }, config)
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={SubmitHandler}>
                <h1>Login</h1>
                <input value = {email} onChange={e => setEmail(e.target.value)}/>
                <input value = {password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Register