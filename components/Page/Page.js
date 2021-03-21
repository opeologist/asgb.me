import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function Page(props) {
  const { page } = styles();

  return <View style={page} {...props} />;
}
