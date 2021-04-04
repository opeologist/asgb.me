import React from "react";
import Line from "../Line";
import Text from "../Text";
import Link from "../Link";
import styles from "./styles";

export default function Footer() {
  const { footer } = styles();

  return (
    <>
      <Line>
        <Text italic comment style={footer} />
      </Line>
      <Line>
        <Link type="comment" style={footer} href="/">
          home
        </Link>
      </Line>
    </>
  );
}
