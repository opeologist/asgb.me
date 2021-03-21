import React from "react";
import { Text as RealText } from "react-native";
import styles from "./styles";

export default function Text({
  children,
  color,
  comment,
  spaceAtEnd,
  style,
  ...rest
}) {
  const { italic, text } = styles();

  return (
    <RealText
      style={[
        text,
        rest.italic && italic,
        style,
        styles()[comment ? "veryDarkGreen" : color],
      ]}
      numberOfLines={1}
      {...rest}
    >
      {comment && "//\u00A0"}
      {children}
      {spaceAtEnd && "\u00A0"}
    </RealText>
  );
}
