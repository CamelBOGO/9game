import Head from "next/head";
import {ThemeProvider, createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: '#484848',
            main: '#212121',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffffff',
            main: '#ffffff',
            dark: '#cccccc',
            contrastText: '#000000',
        }
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 650,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
})

export default function App({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>9Game</title>
                <link rel="shortcut icon" href="/logo_black.svg"/>
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
