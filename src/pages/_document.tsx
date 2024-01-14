import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/RoCall_Icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/RoCall_Icon.png" />
        <link rel="mask-icon" href="/RoCall_Icon.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
