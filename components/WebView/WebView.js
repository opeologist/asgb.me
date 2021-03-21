import React from "react";
import { WebView as RealWebView } from "react-native-webview";
import Page from "../Page";
import styles from "./styles";

export default function WebView({
  route: {
    params: { href },
  },
  navigation,
}) {
  const { webView } = styles();

  return (
    <Page>
      <RealWebView style={webView} source={{ uri: href }} />
    </Page>
  );
}
