import Head from 'next/head'
import Link from 'next/link'
import '@fontsource/roboto'
import {Button, AppBar, Toolbar, Typography, Grid} from "@mui/material";

import IndexCard from "../components/card";

export default function Home() {
    return (
        <div>
            <Head>
                <title>9Game</title>
            </Head>

            <AppBar position="static" style={{background: "#212121"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" color="common.white" sx={{flexGrow: 1}}>
                        9Game
                    </Typography>
                    <Button color="inherit" href="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid
                container
                spaceing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <h1>Hello, World!</h1>
                <IndexCard></IndexCard>
            </Grid>

        </div>
    )
}
