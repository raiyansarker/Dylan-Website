import Head from "next/head";
import { useEffect } from "react";

import "../styles/base.css";

function MyApp({ Component, pageProps }) {
  const og = pageProps.data?.og;
  const title = pageProps.data?.title;

  //add script tag for google analytics
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "./gTagScript.js";
    script.async = true;

    document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  }
  }, []);  
  

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:title" content={title || `Dylan Albertazzi`} />
        <meta property="og:site_name" content="Dylan Albertazzi" />
        <meta
          property="og:description"
          content={
            og
              ? og.description
              : `Writing about the tips I usually share on Twitter and some more.`
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@DylanAlbertazzi" />
        <meta property="og:image" content={og ? og.image : ``} />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👍</text></svg>"
        />
        <link rel="apple-touch-icon" href="https://i.imgur.com/ows3z1X.png" />
        
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-66J1QY576Q"></script>
       
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>

        <title>{title || `Dylan Albertazzi`}</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
