import { useEffect,useState} from "react";
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import { parseCookies } from 'nookies'


export default function Profile() {
    const cookies = parseCookies()
    const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null
    console.log("email:",user)
    const [item, setItem] = useState({  image: '' });
    const [items, setItems] = useState([])
    const email="michael@gmail.com"
    const onSubmit = async function (e) {
        e.preventDefault()

        //console.log(email, password)
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
    const {data} = await axios.post("/api/profile/profile", {item, user}, config)
    console.log("data get",data)
    // console.log("image",item.image)
    }
    useEffect(() => {
        const fetchData = async () => {
            
          const result = await axios.post("/api/profile/profileget",{user}).then(res => res.data);
          console.log('get profile ',  result)
          console.log('Extract '+ result.email)
          setItems(result)
          console.log(items)
  
        }
        fetchData()
      }, [])

    const photo=items   
    console.log("photo,",items)

    return (
        <div className="container">
            <div className="row">

                <form onSubmit={onSubmit}>
                    {/* <input type="text"  onChange={e => setItem({...item,email: e.target.value})}/> */}
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
                {

                <div className="card" key={ photo._id}>                
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{photo.email}</span>
                </div>
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" style={{ width: '100%', height: 300 }} src={photo.profileimg} />
                </div>


                </div>



                }
        </div>

    )
}


