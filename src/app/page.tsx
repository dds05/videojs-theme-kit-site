import Playground from "@/components/Playground";
import Head from "next/head";
import { Suspense } from 'react';
export default function Home() {
  return <>
    <Head>
        <meta name="keywords" content="videojs-plugin, videojs-theme-kit, vidoejs-skin, videojs-player-skin, player-customisation" />
        <link rel="canonical" href="https://videojs-theme-kit-site.vercel.app/" />
      </Head>
    <Suspense fallback={<div>Loading...</div>}>
    <Playground/>
    </Suspense>
  </>;
}
