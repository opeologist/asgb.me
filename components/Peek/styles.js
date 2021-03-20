import { StyleSheet } from "react-native";
import { primaryBorderColor } from "../../constants";

export default function peekStyles() {
  const secondaryBorderColor = "rgba(30, 98, 30, 0.5)";

  return StyleSheet.create({
    wrapper: {
      position: "absolute",
      bottom: "100%",
      left: 0,
    },
    container: {
      borderBottomColor: secondaryBorderColor,
    },
    type: {
      borderBottomColor: primaryBorderColor,
      borderTopWidth: 0,
    },
  });
}
