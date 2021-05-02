import { StyleSheet } from "react-native";
import { backgroundColor } from "../../constants";

export default function arStyles() {
  return StyleSheet.create({
    ar: {
      flex: 1,
    },
    arWrapper: {
      backgroundColor,
      flex: 1,
    },
    arContainer: {
      flex: 1,
    },
  });
}
