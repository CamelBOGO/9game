import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dbConnect from "../lib/dbConnect";
import Post from "../db_models/post_model";
import Comnt from "../db_models/post_model";
import {Button, FormControl, Input, InputLabel, Card, CardActionArea, CardContent, CardMedia , Typography} from "@mui/material";
import {Box} from "@mui/material"
import {useState} from "react";
import {useRouter} from "next/router";
import Like from "./like_post"

export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const router = useRouter()
  const [form, setForm] = useState({
      post_id: props._id,
      user_id: "user8964",
      date: new Date(),
      text: "",
  })

  const handleSubmit = async function (e) {
      e.preventDefault()
      // Here I show you how to post data by calling api.
      try {
          const res = await fetch('/api/comnt', {
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
          router.reload()
      } catch (error) {
          console.error(error)
          console.log("Fail to upload!")
      }
  }

  const handleChange = async function (e) {
      const value = e.target.value
      const name = e.target.name

      setForm({
          ...form,
          [name]: value,
          date: new Date(),
      })
  }

  return (
    
    <div>
      <Button onClick={handleClickOpen('paper')}>Click!</Button>
     
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography noWrap gutterBottom variant="h5" component="div">
          {props.title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{width: 300, height: 800, boxShadow: 5 }}dividers={scroll === 'paper'}>
        
        <Card sx={{width: 300, height: 400, boxShadow: 5}}>
       
            <CardActionArea href={`/post/${props.id}/comnt`}>
                <Box component="div" sx={{height: 200, p: 2}}> 
                    {/*<CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt={content}
                        sx={{m: 2}}
                    />*/}
                    <Typography gutterBottom variant="body1"
                                component="div"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '12',
                                    WebkitBoxOrient: 'vertical',
                                }}>
                        {props.content}
                    </Typography>
                   
                </Box>
                
                <CardContent>
                

                </CardContent>

            </CardActionArea>
             
        </Card>
       
        <Typography noWrap gutterBottom variant="h5" component="div"
                                style={{width: "auto", display: "inline-flex", justifyContent: "space-between"}}>
                        <Like id={props.id} style={{bottom: "0", left: "0", padding: "0"}} likes={props.likes}
                              updateLikedPosts={props.updateLikedPosts} likedPosts={props.likedPosts}
                              likeduser={props.likeduser}/>
        </Typography> 

        <>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="text">Content</InputLabel>
                    <Input
                        type="text"
                        name="text"
                        autoComplete="off"
                        multiline
                        rows={2}
                        onChange={handleChange}
                        required
                        sx={{mb: 2}}
                    />
                </FormControl>
                <br/>
                <Button type="submit">Comment</Button>
            </form>
            
                <Typography key={props._id}>Comment: {props.text} / {props.date}</Typography>

        </>

        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export async function getServerSideProps(context) {
    await dbConnect()
    const {id} = context.query

    // Here I show you how to fetch data in script, //<Typography key={props._id}>Comment: {props.text} / {props.date}</Typography>
    // but you can also call api to help you.
    
    let post = await Post.findById(id).lean()
    post._id = post._id.toString()
    post.postdate = post.postdate.toString()

    const comntsResult = await Comnt.find({post_id: id.toString()})
    const comnts = comntsResult.map((doc) => {
        const comnt = doc.toObject()
        comnt._id = comnt._id.toString()
        comnt.date = comnt.date.toDateString()
        return comnt
    })

    return {props: {post: post, comnts: comnts}}
}