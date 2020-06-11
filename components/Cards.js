import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { themeContext } from "../context";
import { dark, light } from "../ThemeObjects";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Cards = (props) => {
  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;

  function formatNumber(num) {
    var retval = 0;
    if (num != null) {
      retval = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return retval;
  }
  return (
    <View
      style={[styles.cardContainer, { backgroundColor: themeColor.secondary }]}
    >
      <View style={styles.dataSection}>
        <View style={styles.primaryView}>
          <Text style={[styles.header, { color: themeColor.cardText }]}>
            {props.title}
          </Text>
          <Text
            style={{
              color:
                props.title === "Confirmed"
                  ? "#f5bf5b"
                  : props.title === "Deaths"
                  ? "#f55b5b"
                  : "#5bf570",
              fontSize: 36,
              fontWeight: "bold",
            }}
          >
            {formatNumber(props.data)}
          </Text>
        </View>
        <View style={styles.secondaryView}>
          <Text
            style={{
              fontSize: 16,
              color: themeColor.cardText,
            }}
          >
            Last Update :{" "}
            {props.lastUpdate !== "Data Unavailable"
              ? new Date(props.lastUpdate).toDateString()
              : "Data Unavailable"}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor:
            props.title === "Confirmed"
              ? "#f5bf5b"
              : props.title === "Deaths"
              ? "#f55b5b"
              : "#5bf570",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: hp("20%"),
    width: wp("90%"),
    margin: 6,
    elevation: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  dataSection: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    flex: 5,
  },

  mainView: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
  },
  header: {
    fontSize: 22,
  },

  primaryView: {
    flex: 6,
  },
  secondaryView: {
    flex: 1,
  },
});
export default Cards;
