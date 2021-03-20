import React from "react";
import Head from "next/head";

export default function Page({ children, title = "Aaron Giordano-Barry" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}
