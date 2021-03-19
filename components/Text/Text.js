import React from "react";
import { Text as RealText } from "react-native";
import styles from "./styles";

export default function Text({ children, color, spaceAtEnd, style, ...rest }) {
  const { italic, text } = styles();

  return (
    <RealText
      style={[text, rest.italic && italic, style, styles()[color]]}
      numberOfLines={1}
      {...rest}
    >
      {children}
      {spaceAtEnd && "\u00A0"}
    </RealText>
  );
}
