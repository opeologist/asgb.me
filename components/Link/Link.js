import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "next/router";
import styles from "./styles";
import Text from "../Text";

const color = {
  default: "green",
  comment: "veryDarkGreen",
};

export default function Link({
  children,
  onHoverIn = () => {},
  onHoverOut = () => {},
  style,
  href,
  type = "default",
}) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const { wrapper, underline } = styles();

  return (
    <View style={wrapper}>
      {type === "comment" && (
        <Text {...{ style }} color="veryDarkGreen" italic>
          {"//\u00A0"}
        </Text>
      )}
      <Pressable
        onPress={(e) => {
          e.preventDefault();
          router.push(href);
        }}
        onHoverIn={() => {
          onHoverIn();
          setIsHovering(true);
        }}
        onHoverOut={() => {
          onHoverOut();
          setIsHovering(false);
        }}
      >
        <Text
          color={isHovering ? "blue" : color[type]}
          style={[underline, style]}
          accessibilityRole="link"
          {...{ href }}
          italic={type === "comment"}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}
