import React, { useContext } from "react";
import { View, Text } from "react-native";
import Global from "./Screens/Global";
import Countries from "./Screens/Countries";
import About from "./Screens/About";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { themeContext } from "./context";
import { dark, light } from "./ThemeObjects";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Global">
      <Stack.Screen
        name="Global"
        component={GlobalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function GlobalScreen({ navigation }) {
  return <Global navigation={navigation} />;
}
function CountriesScreen() {
  return <Countries />;
}
function AboutScreen({ navigation }) {
  return <About navigation={navigation} />;
}
const ScreenNavigation = () => {
  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;

  return (
    <NavigationContainer theme={{ colors: { background: themeColor.primary } }}>
      <Tab.Navigator
        initialRouteName="Global"
        tabBarPosition="bottom"
        tabBarOptions={{
          style: { backgroundColor: themeColor.primary },
          activeTintColor: themeColor.otherText,
          indicatorStyle: { backgroundColor: themeColor.navIndicator },
        }}
      >
        <Tab.Screen
          name="Countries"
          component={CountriesScreen}
          options={{
            tabBarLabel: "Countries",
          }}
        />
        <Tab.Screen
          name="Global"
          component={StackNavigator}
          options={{
            tabBarLabel: "Global",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;
