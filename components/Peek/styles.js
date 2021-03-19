import { StyleSheet } from "react-native";

export default function peekStyles() {
  const primaryBorderColor = "#1e621e";
  const secondaryBorderColor = "rgba(30, 98, 30, 0.5)";

  return StyleSheet.create({
    wrapper: {
      position: "absolute",
      bottom: "100%",
      left: 0,
    },
    container: {
      borderWidth: 1,
      borderColor: primaryBorderColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderBottomColor: secondaryBorderColor,
    },
    type: {
      borderBottomColor: primaryBorderColor,
      borderTopWidth: 0,
    },
  });
}
