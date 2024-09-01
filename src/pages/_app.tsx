import '../styles/globals.css'; // Import global styles
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react'; // Import the Analytics component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
