import Head from "next/head"
import {useEffect,useState} from 'react'
import axios from 'axios'
import { AppBar,Button,Toolbar,FormControl, Grid, TextField, Typography, Card, Box, Container} from "@mui/material";
import IndexCard from "../components/card";
import dbConnect from "../lib/dbConnect";
import User from"../db_models/user_model"
import cookies from 'nookies'
import { parseCookies } from 'nookies'



export default function admin({users}) {
    const cookies = parseCookies()
    const user = cookies?.email && cookies.email != "undefined" ? cookies.email : null
    // console.log("email:",user)
    const email="michael@gamil.com"
    // ,{ params: { email: user } }
    const [visibility, setVisibility] = useState(false);
    const popupCloseHandler = () => {
        setVisibility(false);
    }

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.post("/api/profile/admin",user);  
          console.log('fetch data;m', result)  
        }
        fetchData()
      }, [])

    return(
        <div style={{paddingTop: 56}}>
            <Head>
                <title>9Game</title>
            </Head>

            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" color="common.white" sx={{flexGrow: 1}}>
                        9Game
                    </Typography>
                    <Button color="inherit" href="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            {/* <NewPostPopUp
                display="flex"
                show={visibility}
                onClose={popupCloseHandler}>
                <NewPost onClose={popupCloseHandler}/>
            </NewPostPopUp> */}
            <Box display="flex" alignItems="center" justifyContent="center">
                <Grid container style={{maxWidth: 700}}>
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} key={user._id}>
                            <Container maxWidth="false" sx={{width: 330, my: 3}}>
                                <form>
                                    <p>{user.email}</p>
                                    <br></br>
                                    <p>{user.password}</p>
                                    <br></br>
                                </form>
                                {/* <IndexCard id={user._id} title={user.email} content={user.password} /> */}
                            </Container>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {/* <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4">You are admin</Typography>
                {
                    // <Grid container style={{maxWidth: 700}}>
                    // {User.map((users) => (
                    //     <Grid item xs={12} sm={6} key={User.email}>
                    //         <Container maxWidth="false" sx={{width: 330, my: 2}}>
                    //             <IndexCard id={User._id} title={User.email} content={User.password}/>
                    //         </Container>
                    //     </Grid>
                    // ))}
                    // </Grid>
                    

                    }
            </Grid> */}
        </div>
    );

}

export async function getServerSideProps(props) {
    try {
        await dbConnect()
        User.find({}, function (err, user) {
            // Create a sample data if no data inside.
            console.log(user)
        })
    } catch (e) {
        console.error(e)
    }

    const result = await User.find({},{profileimg:0})
    const users = result.map((doc) => {
        const user = doc.toObject()
        user._id = user._id.toString()
        user.email = user.email.toString()
        return user
    })


    return {props: { users: users}}
}