import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function Content(props) {
  const { wrapper } = styles();

  return (
    <View style={wrapper}>
      <View {...props} />
    </View>
  );
}
