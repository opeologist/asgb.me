import { StyleSheet } from "react-native";
import { backgroundColor } from "../../constants";

export default function pageStyles() {
  return StyleSheet.create({
    page: {
      backgroundColor,
      flex: 1,
    },
  });
}
