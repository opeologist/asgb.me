import React from "react";
import Head from "next/head";

export default function Page({ children, title = "Aaron Giordano-Barry" }) {
  const analytics = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)}
    gtag('js', new Date());
    gtag('config', 'UA-157733176-1');`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="shortcut icon"
          href="data:image/x-icon;,"
          type="image/x-icon"
        />
        {process.env.NODE_ENV !== "development" && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-157733176-1"
            />
            <script dangerouslySetInnerHTML={{ __html: analytics }} />
          </>
        )}
      </Head>
      {children}
    </>
  );
}
