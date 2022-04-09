import {useState} from "react";
import axios from 'axios'
//import multer from 'multer'
import FileBase64 from 'react-file-base64';
import {useRouter} from "next/router";
import {Grid, FormControl, InputLabel, Input, Button} from "@mui/material";


export default function Profile() {
  
    const [item, setItem] = useState({ email: '', image: '' });


    const onSubmit = async function (e) {
        e.preventDefault()
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post("/api/profile/profile", item, config)
        console.log(data)
    }
    return (
        <div className="container">
            <div className="row">

                <form onSubmit={onSubmit}>
                    <input type="text"  onChange={e => setItem({...item,email: e.target.value})}/>
                    <div className="form-group">
                        {/* <input type="file" id="profile" accept="image/png, image/jpeg"
                            value={images}onChange={e => setImages(e.target.value)}>
                            </input> */}
                            <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                            />

                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                </form>
            </div>
            <div>
            </div>
        </div>

    )
}
