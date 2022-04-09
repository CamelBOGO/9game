import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'


const token = () => {

  const router = useRouter();
  React.useEffect(()=>{
      if(!router.isReady) return;

      const { email, token} = router.query
      const { data } = axios.get("/api/auth/verify", { email, token })
      //console.log(data)

  }, [router.isReady]);

    return (
        <div>
          <h1 onLoad={token}>Email Verified</h1>
        </div>
    )
}

export default token