/**
 * Header Comment Block: what, who, where, when, why, how
 * Admin Page
 * Programmer: Shek Tsz Chuen
 * The admin page called by user when user enter the host /admin.
 * Version: 4, Date: 2022-04-11
 * Purpose: Generate an admin page for admin user to see all users' profile and reject other user to enter.
 * Data Structure:
 *      User
 *      Current User
 * Algorithm:
 *      Get Serverside Props:
 *          Connect DB.
 *          Check login.
 *          Get all user data.
 *          Return all user data and login status by props.
 *
 *      Rendering Function:
 *          Receive props.
 *          Return admin page rendering if the logged in user is a admin.
 *          Return "Please login first." if the user does not login yet.
 *          Return a rejected access page if the user is not a admin.
 */
import {
    AppBar,
    Button,
    Toolbar,
    FormControl,
    Grid,
    TextField,
    Typography,
    Card,
    Box,
    Container,
    CardContent, CardMedia
} from "@mui/material";
import dbConnect from "../lib/dbConnect";
import User from "../db_models/user_model"
import {parseCookies} from 'nookies'



export default function admin({users, currentUser}) {
    //rendering a web page when user is logged in.
    if(currentUser){
    return (
        <>
            {/* if the user is admin */}
            {currentUser.isAdmin ? (
                <div style={{paddingTop: 56}}>
                    {/* App Bar */}
                    <AppBar position="fixed">
                        <Toolbar>
                            <Typography variant="h6" component="div" color="common.white" sx={{flexGrow: 1}}>
                                9Game
                            </Typography>
                                <>
                                                         
                                    {/*Function button: jump to change password page */}
                                    <Button color="secondary" href="/changepassword">Change Password</Button>
                                    {/*Function button: jump to profile page */}
                                    <Button color="secondary" sx={{mr: 2}} href="/profile">My Profile</Button>
                                    {/*Function button: jump to index page */}
                                    <Button color="secondary" href="/">Home</Button>
                                </>
                        </Toolbar>
                        </AppBar>
                            <Typography
                                variant="h4"
                                sx={{m: 3, mt: 5}}>Welcome! Admin</Typography>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Grid container style={{maxWidth: 1400}}>
                                    {users.map((user) => (
                                        <Grid item xs={12} sm={6} key={user._id}>
                                            <Container maxWidth="false" sx={{width: 330, my: 3}}>
                                                <Card sx={{width: 300, boxShadow: 5}}>
                                                    <CardMedia
                                                        component="img"
                                                        height="300"
                                                        image={user.profileimg}
                                                        alt="No profile picture."
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">
                                                            {user.email}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Container>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </div>
                    ) : (
                        // if the user is not a admin
                        <div>
                        <Typography>You should not be here, please return.</Typography>
                        <Button color="inherit" href="/">Click here to return home page</Button>
                        </div>
                    )}
        </>
    )
    }
    //render a message when the user is not login
    return(<Typography>Please login first.</Typography>)
}


// A server function which will run for every client request.
// It will run before the main functions.
export async function getServerSideProps(ctx) {
    //Try to connect the DB.
    await dbConnect()

    // Check login status.
    const cookies = parseCookies(ctx)
    const email = cookies?.email && cookies.email != "undefined" ? cookies.email : null

    // Fetch all user data from DB.
    const result = await User.find({})
    // Convert all datatype from DB datatype to a type that JS can support.
    const users = result.map((doc) => {
        const user = doc.toObject()
        user._id = user._id.toString()
        return user
    })
    // if the user is logged in.
    if (email) {
        let currentUser = await User.findOne({email: email}).lean()
        currentUser._id = currentUser._id.toString()
        // Return all user data and login status by props.
        return {props: {users: users, currentUser}}
    }

    // Return all user data and login status by props.
    return {props: {users: users, currentUser: null}}
}