/**
 * Header Comment Block: what, who, where, when, why, how
 * Post Like Module
 * Programmer: Fong Sze Chung
 * The post like module called by server when there is a post card and post popup.
 * Version: 2, Date: 2022-05-05
 * Purpose: Generate a like button to handle the like event when user click on the like button
 * Data Stucture:
 *      String:         username        (current user)
 *      Boolean:        checkprevious   (like button state)
 *      ObjectId:       id              (post Id)
 *      Object:         form            (grouping parameter used to update the likes in database)
 * Algorithm:
 *      Rendering Function:
 *          Receive props
 *          Create a function to handle data fetching
 *          Create a useEffect hook to handle the like button state changes
 *          Return like button rendering
 */

import React, {useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {pink} from '@mui/material/colors'

export default function Like(props) {
    // Variables used in this module
    const id = props.id;
    const username = props.email

    const checkprevious = props.checked
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    // Form for updating the likes of a post
    const [form, setForm] = useState({
        _id: id,
        email: username,
        inside: checkprevious
    })

    // useEffect handle the like state change when the user clicked on the like button
    useEffect(() => {
        props.setCheck(form.inside)
    }, [form.inside])

    // Function: try to fetch the likes data of a post from the database
    const tryfetch = async(e) => {
        e.persist()
        if (username) {
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

    // Rendering
    // Checkbox is used as a like button
    return (
        <Checkbox {...label} checked={form.inside} icon={<FavoriteBorder/>} 
                  checkedIcon={<Favorite sx={{color: pink[300], '&.Mui-checked': {color: pink[300],},}}/>}
                  onChange={tryfetch} style={{position: "relative", width: "auto", height: "auto", zIndex: "2"}}
                  onMouseDown={event => event.stopPropagation()}
                  onClick={event => { event.stopPropagation(); }}
        />
    );
};
