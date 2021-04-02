import React from "react";
import Text from "../Text";
import Content from "../Content";
import Box from "../Box";
import Line from "../Line";
import styles from "./styles";

export default function Policy() {
  const { heading } = styles();

  return (
    <Content>
      <Line>
        <Text color="lightGreen" style={heading}>
          I Collect No Personal Information Using My Application
        </Text>
      </Line>
      <Line>
        <Text color="green">
          I do not collect, use, save, or have access to any of your personal
          data.
        </Text>
      </Line>
    </Content>
  );
}
