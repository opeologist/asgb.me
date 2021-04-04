import React, { useContext, useEffect, useState } from "react";
import { Text as RealText } from "react-native";
import { ViroText } from "@viro-community/react-viro";
import styles from "./styles";
import { ARContext } from "../../contexts";

export default function Text({
  children = "",
  color,
  comment = false,
  left = 0,
  preSpace = false,
  currentCharAt = 0,
  setCurrentCharAt,
  style,
  i,
  currentLineIndex,
  setCurrentLineIndex,
  ...rest
}) {
  const [charAt, setCharAt] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const { ready } = useContext(ARContext);
  const text = `${comment ? "//" : ""}${preSpace ? "\u00A0" : ""}${children}`;

  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    if (hasMounted && ready && i === currentLineIndex) {
      setCurrentCharAt(currentCharAt + children.length);
      setCurrentLineIndex(currentLineIndex + 1);

      if (i !== 0) {
        setCharAt(currentCharAt);
      }
    }
  }, [
    hasMounted,
    i,
    ready,
    currentLineIndex,
    setCurrentLineIndex,
    currentCharAt,
    setCurrentCharAt,
    children,
    charAt,
  ]);

  const { italic, base } = styles();

  if (ready) {
    return (
      <ViroText
        position={[(preSpace ? 1 : 0 + charAt / 10) - 1.25, 0, 0]}
        style={[
          base,
          rest.italic && italic,
          style,
          styles()[comment ? "veryDarkGreen" : color],
        ]}
        maxLines={1}
        width={4}
        {...{ text }}
        {...rest}
      />
    );
  }

  return (
    <RealText
      style={[
        base,
        rest.italic && italic,
        style,
        styles()[comment ? "veryDarkGreen" : color],
      ]}
      numberOfLines={1}
      {...rest}
    >
      {text}
    </RealText>
  );
}
