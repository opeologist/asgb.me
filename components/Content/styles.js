import { StyleSheet } from "react-native";

export default function contentStyles({ windowWidth, containerWidth }) {
  return StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: containerWidth < windowWidth ? "center" : "flex-start",
      flex: 1,
      overflowX: "auto",
    },
  });
}
