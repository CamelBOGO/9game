import axios from 'axios'
import {useRouter} from 'next/router'


const verify = () => {
    const router = useRouter()
    const { token } = router.query
    console.log(token)
    
    return (
        <div>
            <h1>Email Successfully Verified</h1>
        </div>
    )
}

export default verify