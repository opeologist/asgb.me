import { Platform, StyleSheet } from "react-native";

export default function contentStyles({ windowWidth, containerWidth }) {
  const overflowX = Platform.OS === "web" ? { overflowX: "auto" } : null;

  return StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      flex: 1,
      ...overflowX,
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: containerWidth < windowWidth ? "center" : "flex-start",
    },
  });
}
