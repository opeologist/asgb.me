import React from "react";
import {
  NavigationContainer,
  NavigationContext as RealNavigationContext,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContext } from "./contexts";
import Gateway from "./pages";
import Code from "./pages/code";
import Resume from "./components/Resume";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContext.Provider value={RealNavigationContext}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          screenOptions={{ animationEnabled: false }}
        >
          <Stack.Screen name="/" component={Gateway} />
          <Stack.Screen name="/code" component={Code} />
          <Stack.Screen name="/resume" component={Resume} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>
  );
}
