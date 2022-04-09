import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'


export default function EmailConfirm(){
  const router = useRouter()
  
  const email = router.query["email"]
  const v_token = router.query["token"]

  console.log(email, v_token)
  
  React.useEffect(() => {
    sendToken(email, v_token)
  }, [email, v_token])  

  const sendToken = async(e) => {
    try {
        const config = {
            headers:{
                "Content-Type": "application/json"
            },
        }
        const essential= {"email": email, "v_token": v_token}
        const { data } = await axios.put("/api/auth/verify", {essential}, config)

    } catch(error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Email Verified</h1>
    </div>
  )  
}