import { StyleSheet } from "react-native";
import { primaryBorderColor } from "../../constants";

export default function boxStyles() {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: primaryBorderColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });
}
