import React from "react";
import Line from "../Line";
import Text from "../Text";
import Link from "../Link";
import styles from "./styles";

export default function Footer({ reverse }) {
  const { footer } = styles();
  const firstLine = () => (
    <Line>
      <Text italic comment style={footer} />
    </Line>
  );
  const secondLine = () => (
    <Line>
      <Link type="comment" style={footer} href="/">
        home
      </Link>
    </Line>
  );

  if (reverse) {
    return (
      <>
        {secondLine()}
        {firstLine()}
      </>
    );
  }

  return (
    <>
      {firstLine()}
      {secondLine()}
    </>
  );
}
