import { useState } from 'react'
import axios from 'axios'


const forget = () => {
    const [email,setEmail] = useState("")
    const SubmitHandler = async(e) => {
        e.preventDefault()

        //console.log(email, password)
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/forget", { email }, config)
        console.log(data)
    }
    return (
        
        <div>
            <form onSubmit={SubmitHandler}>
                <h1>Forget</h1>
                <input value = {email} onChange={e => setEmail(e.target.value)}/>
                <button type="submit">Forget</button>
            </form>
        </div>
    )
}

export default forget