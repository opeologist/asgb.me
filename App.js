import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Gateway from "./pages";
import Code from "./pages/code";
import WebView from "./components/WebView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="/" component={Gateway} />
        <Stack.Screen name="/code" component={Code} />
        <Stack.Screen name="WebView" component={WebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
