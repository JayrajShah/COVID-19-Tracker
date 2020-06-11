import React, { useContext } from "react";
import { View, Text } from "react-native";
import Global from "./Screens/Global";
import Countries from "./Screens/Countries";
import About from "./Screens/About";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { themeContext } from "./context";
import { dark, light } from "./ThemeObjects";

const Tab = createMaterialTopTabNavigator();
function GlobalScreen() {
  return <Global />;
}
function CountriesScreen() {
  return <Countries />;
}
function AboutScreen() {
  return <About />;
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
          component={GlobalScreen}
          options={{
            tabBarLabel: "Global",
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarLabel: "About",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;
