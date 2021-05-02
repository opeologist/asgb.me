import React, { cloneElement, useContext, useState, useEffect } from "react";
import { Platform, View } from "react-native";
import styles from "./styles";
import Text from "../Text";
import { ARContext } from "../../contexts";

let ViroFlexView;

if (Platform.OS !== "web") {
  ViroFlexView = require("@viro-community/react-viro").ViroFlexView;
}

export default function Line({
  style,
  indent = 0,
  children,
  num = 1,
  ...rest
}) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [lineEnd, setLineEnd] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const { ready } = useContext(ARContext);
  const renderChildren = () => {
    const clonedChildren = [];

    React.Children.map(children, (child, i) => {
      if (React.isValidElement(child)) {
        clonedChildren.push(
          cloneElement(child, {
            currentX,
            setCurrentX,
            key: i,
            i,
            currentLineIndex,
            setCurrentLineIndex,
            totalChildren: children.length,
            lineEnd,
            setLineEnd,
          })
        );
      }

      return child;
    });

    return clonedChildren;
  };

  useEffect(() => {
    if (lineEnd) {
      setOpacity(1);
    }
  }, [lineEnd]);

  const { line } = styles();

  if (ready) {
    return (
      <ViroFlexView
        position={[indent * 0.11, 2.6 - num * 0.2, 0]}
        {...{ style, opacity }}
        {...rest}
      >
        {renderChildren()}
      </ViroFlexView>
    );
  }

  return (
    <View style={[line, style]} {...rest}>
      <Text>{"\u00A0".repeat(indent)}</Text>
      {children}
    </View>
  );
}
