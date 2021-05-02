import React from "react";
import Line from "../Line";
import Text from "../Text";
import Link from "../Link";
import styles from "./styles";

export default function Header() {
  const { header } = styles();

  return (
    <>
      <Line>
        <Link type="comment" style={header} href="/ar">
          ar
        </Link>
      </Line>
      <Line>
        <Text italic comment style={header} />
      </Line>
    </>
  );
}
