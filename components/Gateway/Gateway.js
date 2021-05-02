import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Text from "../Text";
import Content from "../Content";
import Line from "../Line";
import Link from "../Link";

export default function Gateway() {
  const { heading } = styles();

  return (
    <Content>
      <Line>
        <Text color="orange" style={heading}>
          {"<"}
        </Text>
        <View>
          <Link style={heading} href="/code">
            ASGB
          </Link>
        </View>
        <Text color="orange" style={heading}>
          {"\u00A0/>"}
        </Text>
      </Line>
      <Line>
        <Text italic comment style={heading} />
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="https://raw.githubusercontent.com/opeologist/opeologist.github.io/mainline/Aaron-Giordano-Barry-Resume.pdf"
        >
          resume
        </Link>
      </Line>
      <Line>
        <Text italic comment style={heading} />
      </Line>
      <Line>
        <Link type="comment" style={heading} href="mailto:email@asgb.me">
          email
        </Link>
      </Line>
      <Line>
        <Text italic comment style={heading} />
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="https://www.linkedin.com/in/asgb"
        >
          linkedin
        </Link>
      </Line>
      <Line>
        <Text italic comment style={heading} />
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="https://github.com/opeologist/opeologist.github.io"
        >
          source
        </Link>
      </Line>
    </Content>
  );
}
