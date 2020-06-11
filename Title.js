import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from "react-native";
import { themeContext } from "./context";
import { dark, light } from "./ThemeObjects";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Title = () => {
  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("theme", theme);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        setTheme((prevTheme) => {
          prevTheme = value;
          return prevTheme;
        });
      }
    } catch (e) {}
  };

  //getting the data
  useEffect(() => {
    getData();
  }, []);

  //storing theme on every themeChange
  useEffect(() => {
    storeData();
  }, [theme]);

  return (
    <View
      style={[styles.titleContainer, { backgroundColor: themeColor.primary }]}
    >
      <StatusBar
        barStyle={theme == "dark" ? "light-content" : "dark-content"}
        backgroundColor={themeColor.primary}
      />
      <Text style={[styles.title, { color: themeColor.titleText }]}>
        COVID-19 TRACKER
      </Text>
      <View style={styles.themeContainer}>
        <TouchableOpacity
          onPress={() => {
            setTheme((prevTheme) => {
              return prevTheme === "dark" ? "light" : "dark";
            });
          }}
        >
          <Icon
            name={theme === "dark" ? "sun" : "moon"}
            size={28}
            color={themeColor.titleText}
          />

          <Text style={[styles.themeText, { color: themeColor.titleText }]}>
            {theme === "dark" ? "Light" : "Dark"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingLeft: 10,
    paddingBottom: 10,
    elevation: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: hp(4),
    fontWeight: "bold",
  },
  themeContainer: {
    paddingRight: 20,
  },
});
export default Title;
