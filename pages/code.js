import React from "react";
import { Platform } from "react-native";
import Page from "../components/Page";
import Content from "../components/Content";
import Source from "../components/Source";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Code() {
  return (
    <Page>
      <Content scrollView>
        {Platform.OS === "ios" && <Header />}
        <Source />
        <Footer />
      </Content>
    </Page>
  );
}
