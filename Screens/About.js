import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { themeContext } from "../context";
import { dark, light } from "../ThemeObjects";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import ContactCard from "../components/ContactCard";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const About = ({ navigation }) => {
  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;
  return (
    <View style={styles.container}>
      <View style={styles.gobackContainer}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            navigation.navigate("Global");
          }}
        >
          <Icon name="chevron-left" color={themeColor.titleText} size={28} />
        </TouchableOpacity>
      </View>
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
      <View style={styles.contactContainer}>
        <ContactCard
          iconName="github"
          title="GitHub"
          url="https://github.com/JayrajShah"
        />
        <ContactCard
          iconName="instagram"
          title="Instagram"
          url="https://www.instagram.com/jjs_straight_outta_hell/"
        />
        <ContactCard
          iconName="linkedin"
          title="LinkedIn"
          url="https://www.linkedin.com/in/jjs1999/"
        />
        <ContactCard
          iconName="youtube"
          title="YouTube"
          url="https://www.youtube.com/channel/UCEcqK6Qi_r8Wvg86UaVV3CQ"
        />
      </View>
    </View>
  );
};
//

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  gobackContainer: {
    width: wp("100%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: hp("1%"),
    marginLeft: wp("2%"),
  },
  goBack: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileWrapper: {
    height: 150,
    width: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 10,
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
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
});
export default About;
