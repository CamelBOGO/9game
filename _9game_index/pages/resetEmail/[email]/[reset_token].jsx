import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import React from 'react'


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
        console.log(data)
    }
    return (
        
        <div>
            <form onSubmit={SubmitHandler}>
                <h1>Reset</h1>
                <input value = {password} onChange={e => setPassword(e.target.value)}/>
                <input value = {confirmPassword} onChange={e => setconfirmPassword(e.target.value)}/>
                <button type="submit">Reset</button>
            </form>
        </div>
    )
}

export default Reset