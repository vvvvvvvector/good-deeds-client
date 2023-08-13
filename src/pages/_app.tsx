import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

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

  const mainstyle = `${inter.className} grid h-full w-full place-items-center`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <main className={mainstyle}>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </SessionProvider>
    </>
  );
}
