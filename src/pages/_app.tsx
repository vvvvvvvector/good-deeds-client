import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Toaster } from 'react-hot-toast';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
});

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const title = 'Good Things 🥺';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <main className={`${inter.className} main`}>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </SessionProvider>
    </>
  );
}
