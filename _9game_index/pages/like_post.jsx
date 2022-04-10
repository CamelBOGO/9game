import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors'

export default function Like(props) {
    const id = props.id;
    const username = props.email

    let currentlikeduser = props.likeduser
    const checkprevious = (currentlikeduser.includes(username))? true: false
    const label = { inputProps: { 'aria-label': 'Checkbox demo'}};

    const [form, setForm] = useState({
        _id: id,
        email: username,
        inside: checkprevious
    })

    const tryfetch = async (e) => {
        e.persist()
        
        if (username){
            const check = e.target.checked
            setForm({
                _id: id,
                email: username,
                inside: check
            })

            try {
                const res = await fetch('/api/like_api', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })

                if (!res.ok) {
                    throw new Error(res.status)
                }
            } catch (error) {
                console.error(error)
                console.log("Fail to upload!")
            }
        }
    }

    return (
        <Checkbox {...label} checked={form.inside} icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{ color: pink[300], '&.Mui-checked': { color: pink[300], }, }} />} 
        onChange={tryfetch} style={{position: "relative", width: "auto", height: "auto", zIndex: "2"}}
        />
    );
};
