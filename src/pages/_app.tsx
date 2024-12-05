import '../styles/globals.css'; // Import global styles
import type { AppProps } from 'next/app';
import Head from 'next/head'; // Import Head for adding custom <head> content
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&family=Playwrite+US+Modern:wght@100..400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
