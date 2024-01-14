import '@/styles/globals.css'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head';

const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>RoCall</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/RoCall_Icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/RoCall_Icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/RoCall_Icon.png" />
        <link rel="mask-icon" href="/RoCall_Icon.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </Head>
      <ChakraProvider theme={extendTheme(theme)}>
        <ColorModeScript />
        <Component {...pageProps} />
      </ChakraProvider>
    </div>

  )
};
