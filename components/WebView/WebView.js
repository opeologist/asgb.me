import React from "react";
import { Alert } from "react-native";
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

  Alert.alert(href);

  return (
    <Page>
      <RealWebView style={webView} source={{ uri: href }} />
    </Page>
  );
}
