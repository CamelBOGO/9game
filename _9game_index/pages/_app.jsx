/**
 * Header Comment Block: what, who, where, when, why, how
 * _app: Project properties for React
 * Programmer: Yu Sun Leung
 * Calling by backend server before everything.
 * Version: 2, Date: 2022-04-10
 * Purpose: Record the project properties for React.
 * Data Structure:
 *      Theme: Theme
 *
 * Algorithm:
 *      Rendering Function:
 *          Define a theme.
 *          Return global rendering.
 */

import Head from "next/head";
import {ThemeProvider, createTheme} from "@mui/material";

// Define a theme.
const theme = createTheme({
    // Colour
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

    // Layout
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

// Export project properties.
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
