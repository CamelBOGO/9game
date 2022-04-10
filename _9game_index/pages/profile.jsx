import { useEffect,useState} from "react";
import axios from 'axios'
// import multer from 'multer'
import FileBase64 from 'react-file-base64';
import {useRouter} from "next/router";
import {Grid, FormControl, InputLabel, Input, Button} from "@mui/material";


export default function Profile() {
  
    const [item, setItem] = useState({ email: '', image: '' });
    const [items, setItems] = useState([])
    const testemail="test@gmail.com"
    const onSubmit = async function (e) {
        e.preventDefault()
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post("/api/profile/profile", item, config)
        console.log(data)
        setItems([...items, result]);
    }

    useEffect(() => {
        const fetchData = async () => {
            
          const result = await axios.get("/api/profile/profile");;
          console.log('fetch data;m', result)
          setItems(result)
        }
        fetchData()
      }, [])
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
            {/* {items=> (

                <div className="card" key={item._id}>
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" style={{ width: '100%', height: 300 }} src={item.image} />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{item.email}</span>
                </div>
                </div>
                )} */}
        </div>

    )
}
