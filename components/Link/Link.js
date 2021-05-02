import React, { useCallback, useState, useContext } from "react";
import { Linking, View, Pressable, Platform, Alert } from "react-native";
import styles from "./styles";
import { NavigationContext } from "../../contexts";
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
  const [isHovering, setIsHovering] = useState(false);
  const handleExternalPress = useCallback(async () => {
    const supported = await Linking.canOpenURL(href);

    if (supported) {
      await Linking.openURL(href);
    } else {
      Alert.alert(`can't open url: ${href}`);
    }
  }, [href]);
  const Navigation = useContext(NavigationContext);
  const renderLink = (navigate) => (
    <View style={wrapper}>
      {type === "comment" && (
        <Text {...{ style }} color="veryDarkGreen" italic>
          {"//\u00A0"}
        </Text>
      )}
      <Pressable
        onPress={() => {
          if (Platform.OS !== "web") {
            if (href.substr(0, 1) !== "/") {
              handleExternalPress();
            } else {
              navigate(href, {
                ...{ href },
              });
            }
          }
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

  const { wrapper, underline } = styles();

  if (Platform.OS !== "web") {
    return (
      <Navigation.Consumer>
        {({ navigate }) => renderLink(navigate)}
      </Navigation.Consumer>
    );
  }

  return renderLink();
}
