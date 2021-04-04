import React from "react";
import Page from "../components/Page";
import Content from "../components/Content";
import Source from "../components/Source";
import Footer from "../components/Footer";

export default function Code() {
  return (
    <Page>
      <Content scrollView>
        <Source />
        <Footer />
      </Content>
    </Page>
  );
}
