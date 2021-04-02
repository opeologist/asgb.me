import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Gateway from "./pages";
import Code from "./pages/code";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{ animationEnabled: false }}
      >
        <Stack.Screen name="/" component={Gateway} />
        <Stack.Screen name="/code" component={Code} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
