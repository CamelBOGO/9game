import Head from "next/head";

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>9Game</title>
                <link rel="shortcut icon" href="/logo_black.svg"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
