import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, View, useWindowDimensions } from "react-native";
import styles from "./styles";

export default function Content({ scrollView, ...rest }) {
  const { width } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(width);
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const renderChildren = () => (
    <Animated.View
      onLayout={({ nativeEvent: { layout } }) => {
        setContainerWidth(layout.width);
        setVisible(true);
      }}
      style={{ opacity: fadeAnim }}
      {...rest}
    />
  );

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const { wrapper, contentContainer } = styles({
    windowWidth: width,
    containerWidth,
  });

  return scrollView ? (
    <ScrollView
      horizontal
      style={wrapper}
      contentContainerStyle={contentContainer}
    >
      {renderChildren()}
    </ScrollView>
  ) : (
    <View style={contentContainer}>{renderChildren()}</View>
  );
}
