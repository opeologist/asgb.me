import React, { cloneElement, useContext, useState } from "react";
import { View } from "react-native";
import { ViroFlexView } from "@viro-community/react-viro";
import styles from "./styles";
import Text from "../Text";
import { ARContext } from "../../contexts";

export default function Line({
  style,
  indent = 0,
  children,
  num = 1,
  ...rest
}) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharAt, setCurrentCharAt] = useState(0);
  const { ready } = useContext(ARContext);

  const { line } = styles();

  if (ready) {
    const renderChildren = () => {
      const clonedChildren = [];

      React.Children.map(children, (child, i) => {
        if (React.isValidElement(child)) {
          clonedChildren.push(
            cloneElement(child, {
              currentCharAt,
              key: i,
              setCurrentCharAt,
              i,
              currentLineIndex,
              setCurrentLineIndex,
            })
          );
        }

        return child;
      });

      return clonedChildren;
    };

    return (
      <ViroFlexView
        position={[0.5 + indent * 0.08, 2.6 - num * 0.2, 0]}
        {...{ style }}
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
