import React, { useContext } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { themeContext } from "../context";
import { dark, light } from "../ThemeObjects";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";

const Cards = (props) => {
  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;

  return (
    <View
      style={[styles.cardContainer, { backgroundColor: themeColor.secondary }]}
    >
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(props.url);
        }}
      >
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
    width: 300,
    margin: 6,
    elevation: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
});
export default Cards;
