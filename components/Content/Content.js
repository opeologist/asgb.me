import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import styles from "./styles";

export default function Content({ style, ...rest }) {
  const { width } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(0);

  const { wrapper, container } = styles({
    windowWidth: width,
    containerWidth,
  });

  return (
    <View style={wrapper}>
      <View
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => {
          setContainerWidth(width);
        }}
        style={[container, style]}
        {...rest}
      />
    </View>
  );
}
