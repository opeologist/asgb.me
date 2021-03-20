import { StyleSheet } from "react-native";

export default function textStyles() {
  return StyleSheet.create({
    text: {
      fontFamily: `"Dank Mono", Consolas, "Courier New", monospace`,
    },
    italic: {
      fontStyle: "italic",
    },
    orange: {
      color: "#ffb84d",
    },
    lightGreen: {
      color: "#b1e7b1",
    },
    green: {
      color: "#32cd32",
    },
    darkGreen: {
      color: "#00b359",
    },
    veryDarkGreen: {
      color: "#1e621e",
    },
    brown: {
      color: "#9f6934",
    },
    blue: {
      color: "#4e94ce",
    },
    teal: {
      color: "#1fada6",
    },
    pink: {
      color: "#e56697",
    },
    yellow: {
      color: "#ffff4d",
    },
  });
}
