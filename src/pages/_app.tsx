import { Inter } from 'next/font/google';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const title = 'Good Things 🥺';

  const mainstyle = `${inter.className} grid h-full w-full place-items-center`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={mainstyle}>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </>
  );
}
