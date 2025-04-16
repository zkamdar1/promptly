import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Promptly | AI Prompt Optimizer</title>
        <meta name="description" content="Rewrite your AI prompts to be more effective, structured, and context-aware" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
} 