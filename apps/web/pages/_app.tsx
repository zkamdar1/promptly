import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

// TODO: Replace placeholder values for production
const siteTitle = "Promptly | AI Prompt Enhancer & BuildSpec Generator";
const siteDescription = "Supercharge your AI interactions. Optimize prompts or generate full app build specifications from your ideas.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Use env var or default
const ogImage = `${siteUrl}/og-image.png`; // Standard OG image in /apps/web/public/
const twitterImage = ogImage; // Use the same image for Twitter card

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Basic Meta */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Note: Favicon links are now managed in _document.tsx */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" /> {/* Standard OG image width */}
        <meta property="og:image:height" content="630" /> {/* Standard OG image height */}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={twitterImage} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
} 