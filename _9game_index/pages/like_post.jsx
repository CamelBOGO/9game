import React, {useState} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function Like(props) {
    const id = props.id;
    const [isLiked, updateLike] = useState(false);
    const username = "brian@1.com"
    
    let currentLikePosts = props.likedPosts;
    let likeduser = props.likeduser;
    const currentlikeduser = likeduser;

    const [userform, setUser] = useState({
        email: username,
        likedPosts: currentLikePosts,
    })

    const [form, setForm] = useState({
        _id: id,
        likeduser: currentlikeduser,
    })

    const handleLike = async function (e) {
        e.preventDefault()

        if (!isLiked) {
            updateLike(true);
            // if (!currentLikePosts.includes(id)) {
            //     props.updateLikedPosts(
            //         currentLikePosts.push(id)
            //     );

            //     try {
            //         setForm({
            //             likeduser: likeduser.push(username),
            //         })
            //         setUser({
            //             likedPosts: currentLikePosts,
            //         })
            //         const res = await fetch('/api/like_api', {
            //             method: 'POST',
            //             headers: {
            //                 Accept: 'application/json',
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify(form),
            //         })
                    
            //         if (!res.ok) {
            //             throw new Error(res.status)
            //         }

            //         res = await fetch('/api/user_api', {
            //                 method: 'POST',
            //                 headers: {
            //                     Accept: 'application/json',
            //                     'Content-Type': 'application/json',
            //                 },
            //                 body: JSON.stringify(userform),
            //         })

            //         if (!res.ok) {
            //             throw new Error(res.status)
            //         }
                    
            //     } catch (error) {
            //         console.error(error)
            //         console.log("Fail to upload!")
            //     }
            // }
        }
        else {
            updateLike(false);
            // if (currentLikePosts.includes(id)) {
            //     props.updateLikedPosts(
            //         currentLikePosts.filter(_id => _id !== id)
            //     );

            //     try{
            //         likeduser.filter(likeduser => likeduser !== username);
            //         setForm({
            //             likeduser: likeduser,
            //         })
            //         setUser({
            //             likedPosts: currentLikePosts,
            //         })

            //         const res = await fetch('/api/like_api', {
            //             method: 'POST',
            //             headers: {
            //                 Accept: 'application/json',
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify(form),
            //         })

            //         if (!res.ok) {
            //             throw new Error(res.status)
            //         }

            //         res = await fetch('/api/user_api', {
            //             method: 'POST',
            //             headers: {
            //                 Accept: 'application/json',
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify(userform),
            //         })

            //         if (!res.ok) {
            //             throw new Error(res.status)
            //         }
            //     } catch (error) {
            //         console.error(error)
            //         console.log("Fail to upload!")
            //     }
            // }
        }
    };

    return (
            <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder/>} 
                        checkedIcon={<Favorite/>}
                name="checkedH" onClick={handleLike} 
                />}
            />
    );
};
