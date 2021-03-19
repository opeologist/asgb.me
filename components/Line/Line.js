import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Text from "../Text";

export default function Line({ style, indent, children, ...rest }) {
  const { line } = styles();

  return (
    <View style={[line, style]} {...rest}>
      <Text>{"\u00A0".repeat(indent)}</Text>
      {children}
    </View>
  );
}
