import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { themeContext } from "../context";
import { dark, light } from "../ThemeObjects";
import { ScrollView } from "react-native-gesture-handler";
import AboutCard from "../components/AboutCards";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const About = () => {
  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;
  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <Image
          source={require("../assets/profile.jpg")}
          style={styles.profileImage}
        ></Image>
      </View>
      <View style={styles.credentials}>
        <Text style={[styles.name, { color: themeColor.titleText }]}>
          Jayraj Shah
        </Text>
        <Text style={[styles.desg, { color: themeColor.cardText }]}>
          Developer | Designer
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  profileWrapper: {
    height: 150,
    width: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 40,
    marginBottom: 20,
  },
  profileImage: {
    height: 150,
    width: 150,
  },
  credentials: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: hp(4),
    fontWeight: "200",
  },
  desg: {
    fontSize: hp(1.7),
  },
});
export default About;
