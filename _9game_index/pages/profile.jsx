import {useState} from "react";
import axios from 'axios'
//import multer from 'multer'
import {useRouter} from "next/router";
import {Grid, FormControl, InputLabel, Input, Button} from "@mui/material";


export default function Profile() {
    const [images, setImages] = useState([]);
    const [email, setEmail] = useState("")


    const onSubmit = async function (e) {
        e.preventDefault()

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post("/api/profile/profile", {email, images}, config)
        console.log(data)
    }
    return (
        <div className="container">
            <div className="row">
                <img/>
                <form onSubmit={onSubmit}>
                    <input value={email} onChange={e => setEmail(e.target.value)}/>
                    <div className="form-group">
                        {/* <input type="file" id="profile" accept="image/png, image/jpeg"
                            value={images}onChange={e => setImages(e.target.value)}>
                            </input> */}
                        <input type="file" id="image"
                               name="image" value="" required></input>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                </form>
            </div>
            <div>
                {/*<img src="data:image/<%=image.img.contentType%>;base64,
                     <%=image.img.data.toString('base64')%>">*/}
            </div>
        </div>

    )
}
