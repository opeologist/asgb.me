import React, { useContext, useEffect, useState, useRef } from "react";
import { Text as RealText, Platform } from "react-native";
import styles from "./styles";
import { ARContext } from "../../contexts";

let ViroFlexView;
let ViroText;

if (Platform.OS !== "web") {
  ViroFlexView = require("@viro-community/react-viro").ViroFlexView;
  ViroText = require("@viro-community/react-viro").ViroText;
}

export default function Text({
  children = "",
  color,
  comment = false,
  preSpace = false,
  currentX = 0,
  setCurrentX,
  style,
  i,
  currentLineIndex,
  setCurrentLineIndex,
  totalChildren,
  setLineEnd,
  lineEnd,
  ...rest
}) {
  const [x, setX] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasSetCurrentX, setHasSetCurrentX] = useState(false);
  const [hasSetX, setHasSetX] = useState(false);
  const [width, setWidth] = useState(null);
  const { ready } = useContext(ARContext);
  const ref = useRef(null);
  const text = `${comment ? "//" : ""}${preSpace ? "\u00A0" : ""}${children}`;
  const getBoundingBox = async () => {
    const {
      boundingBox: { minX, maxX },
    } = await ref.current.getBoundingBoxAsync();

    setWidth(maxX - minX);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    if (
      hasMounted &&
      ready &&
      i === currentLineIndex &&
      !hasSetCurrentX &&
      !hasSetX
    ) {
      getBoundingBox();
    }
  }, [hasMounted, i, ready, currentLineIndex, hasSetCurrentX, hasSetX, width]);
  useEffect(() => {
    if (
      hasMounted &&
      ready &&
      i === currentLineIndex &&
      !hasSetCurrentX &&
      !hasSetX &&
      width !== null
    ) {
      setX(currentX);
      setHasSetX(true);
    }
  }, [
    width,
    setHasSetCurrentX,
    currentX,
    setX,
    x,
    hasMounted,
    ready,
    currentLineIndex,
    i,
    hasSetCurrentX,
    hasSetX,
  ]);
  useEffect(() => {
    if (
      hasMounted &&
      ready &&
      i === currentLineIndex &&
      hasSetX &&
      !hasSetCurrentX &&
      width !== null
    ) {
      setCurrentX(currentX + width);
      setHasSetCurrentX(true);
    }
  }, [
    hasSetCurrentX,
    i,
    currentX,
    currentLineIndex,
    hasMounted,
    ready,
    hasSetX,
    setHasSetCurrentX,
    setCurrentX,
    width,
  ]);
  useEffect(() => {
    if (
      hasMounted &&
      ready &&
      i === currentLineIndex &&
      hasSetX &&
      hasSetCurrentX &&
      width !== null
    ) {
      setLineEnd(true);
      setCurrentLineIndex(currentLineIndex + 1);
    }
  }, [
    hasSetCurrentX,
    i,
    setX,
    currentX,
    setCurrentLineIndex,
    currentLineIndex,
    children,
    x,
    hasMounted,
    ready,
    hasSetX,
    totalChildren,
    setLineEnd,
    width,
  ]);

  const { italic, base, ar } = styles();

  if (ready) {
    return (
      <ViroFlexView ref={ref}>
        <ViroText
          position={[x, 0, 0]}
          style={[style, styles()[comment ? "veryDarkGreen" : color], ar]}
          maxLines={1}
          width={6.4}
          {...{ text }}
        />
      </ViroFlexView>
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
