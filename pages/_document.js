import React, { Children } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native";
import config from "../app.json";
// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  @font-face {
    font-family: "Dank Mono";
    src: url("/fonts/DankMono-Regular.otf") format("opentype");
  }

  @font-face {
    font-family: "Dank Mono";
    src: url("/fonts/DankMono-Italic.otf") format("opentype");
    font-style: italic;
  }
  div::selection {
    background: #003030;
  }
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default class AGBEngineerDocument extends Document {
  static async getInitialProps({ renderPage }) {
    AppRegistry.registerComponent(config.name, () => Main);
    const { getStyleElement } = AppRegistry.getApplication(config.name);
    const page = await renderPage();
    const styles = [
      // eslint-disable-next-line react/jsx-key
      <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement(),
    ];
    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html
        style={{
          height: "100%",
          backgroundColor: "rgb(0, 32, 32)",
        }}
      >
        <Head />
        <body
          style={{
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
