import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Text from "../Text";
import Content from "../Content";
import Line from "../Line";
import Link from "../Link";

export default function Gateway({ navigation: { navigate } }) {
  const { heading } = styles();

  return (
    <Content>
      <Line>
        <Text color="orange" style={heading}>
          {"<"}
        </Text>
        <View>
          <Link style={heading} href="/code" {...{ navigate }}>
            AGB
          </Link>
        </View>
        <Text color="orange" style={heading}>
          {"\u00A0/>"}
        </Text>
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="mailto:me@agb.engineer"
          {...{ navigate }}
        >
          email
        </Link>
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="https://www.linkedin.com/in/aarongb"
          {...{ navigate }}
        >
          linkedin
        </Link>
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="https://github.com/opeologist/opeologist.github.io"
          {...{ navigate }}
        >
          source
        </Link>
      </Line>
    </Content>
  );
}
