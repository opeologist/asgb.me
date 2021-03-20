import React from "react";
import { AppRegistry, Text, View } from "react-native";
import { name as appName } from "./app.json";

const App = () => (
  <View>
    <Text>asdf</Text>
  </View>
);

AppRegistry.registerComponent(appName, () => App);
