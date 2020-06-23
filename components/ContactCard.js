import Icon from "react-native-vector-icons/Feather";
import React, { useContext } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { themeContext } from "../context";
import { dark, light } from "../ThemeObjects";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ContactCard(props) {
  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: themeColor.secondary }]}
      onPress={() => {
        Linking.openURL(props.url);
      }}
    >
      <Icon name={props.iconName} size={28} color={themeColor.titleText}></Icon>
      <Text style={{ color: themeColor.titleText }}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(30),
    height: wp(30),
    marginHorizontal: wp(3),
    marginVertical: hp(3),
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
    borderRadius: 10,
  },
});
