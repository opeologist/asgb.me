import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function Box({ style, ...rest }) {
  const { container } = styles();

  return <View style={[container, style]} {...rest} />;
}
