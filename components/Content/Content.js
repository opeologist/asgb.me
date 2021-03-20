import React, { useEffect, useRef, useState } from "react";
import { Animated, View, useWindowDimensions } from "react-native";
import styles from "./styles";

export default function Content(props) {
  const { width } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(width);
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const { wrapper } = styles({
    windowWidth: width,
    containerWidth,
  });

  return (
    <View style={[wrapper]}>
      <Animated.View
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => {
          setContainerWidth(width);
          setVisible(true);
        }}
        style={{ opacity: fadeAnim }}
        {...props}
      />
    </View>
  );
}
