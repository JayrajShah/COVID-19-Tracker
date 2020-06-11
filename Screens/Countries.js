import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import { fetchData, fetchCountries } from "../API/countryData";
import Card from "../components/Cards";
import { Dropdown } from "react-native-material-dropdown";
import { themeContext } from "../context";
import { dark, light } from "../ThemeObjects";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AdMobBanner } from "expo-ads-admob";

export default function Global() {
  const countryList = async () => {
    let arr = [];
    arr = await fetchCountries();
    setCountries((currentList) => {
      currentList = arr;
      return currentList;
    });
  };

  const [Countries, setCountries] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("India");
  const [refreshing, setRefreshing] = React.useState(false);
  const [Data, setData] = useState({
    confirmed: {
      detail: "",
      value: null,
    },
    deaths: {
      detail: "",
      value: null,
    },
    recovered: {
      detail: "",
      value: null,
    },
    lastUpdate: "",
  });
  const populateDataState = async () => {
    console.log("From Popluate Function : " + selectedCountry);
    const fetchedData = await fetchData(
      ("https://covid19.mathdro.id/api/countries/" + selectedCountry)
        .toString()
        .toLowerCase()
    );
    setData((currentData) => {
      currentData = fetchedData;
      return currentData;
    });
  };

  useEffect(() => {
    populateDataState();
    countryList();
  }, []);

  useEffect(() => {
    console.log("From useEffect " + selectedCountry);
    populateDataState();
  }, [selectedCountry]);

  // useEffect(() => {
  //   console.log(Data);
  // }, [Data]);

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  useEffect(() => {
    console.log("From Refresh useEffect " + selectedCountry);
    populateDataState();
  }, [refreshing]);

  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;
  return (
    <View style={[styles.container, { backgroundColor: themeColor.primary }]}>
      <ScrollView
        style={{ height: hp(75) }}
        contentContainerStyle={[
          styles.scrollViewContainer,
          { backgroundColor: themeColor.primary, height: "100%" },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#f5bf5b", "#f55b5b", "#5bf570"]}
            progressBackgroundColor={themeColor.secondary}
          />
        }
      >
        <View style={styles.dropdownContainer}>
          <Dropdown
            label="Select Country"
            data={Countries}
            baseColor={themeColor.otherText}
            textColor={themeColor.otherText}
            selectedItemColor={themeColor.otherText}
            value="India"
            onChangeText={(value) => {
              setSelectedCountry((currentValue) => {
                currentValue = value;
                return currentValue;
              });
            }}
            itemColor={themeColor.dropDownInactive}
            pickerStyle={{
              borderRadius: 10,
              height: hp("74%"),
              backgroundColor: themeColor.secondary,
              transform: [{ translateY: 50 }],
            }}
            animationDuration={10}
          />
        </View>
        <View style={styles.cardContainer}>
          <Card
            title="Confirmed"
            data={Data.confirmed.value}
            lastUpdate={Data.lastUpdate}
          />
          <Card
            title="Deaths"
            data={Data.deaths.value}
            lastUpdate={Data.lastUpdate}
          />
          <Card
            title="Recovered"
            data={Data.recovered.value}
            lastUpdate={Data.lastUpdate}
          />
        </View>
      </ScrollView>
      <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-4042343950510608/9292867326"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scrollViewContainer: {},
  dropdownContainer: {
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  cardContainer: {
    alignItems: "center",
  },
});
