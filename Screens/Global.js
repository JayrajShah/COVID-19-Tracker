import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import { fetchData } from "../API/globalData";
import Card from "../components/Cards";
import { themeContext } from "../context";
import { dark, light } from "../ThemeObjects";
import { AdMobBanner } from "expo-ads-admob";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Global({ navigation }) {
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
    const fetchedData = await fetchData();
    setData((currentData) => {
      currentData = fetchedData;
      return currentData;
    });
  };

  useEffect(() => {
    populateDataState();
  }, []);

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      populateDataState();
      setRefreshing(false);
    });
  }, [refreshing]);

  const [theme, setTheme] = useContext(themeContext);
  const themeColor = theme === "dark" ? dark : light;
  return (
    <View style={[styles.container, { backgroundColor: themeColor.primary }]}>
      <ScrollView
        style={{ height: hp("70%") }}
        contentContainerStyle={[
          styles.scrollViewContainer,
          { backgroundColor: themeColor.primary },
        ]}
        style={{ height: hp(75) }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#f5bf5b", "#f55b5b", "#5bf570"]}
            progressBackgroundColor={themeColor.secondary}
          />
        }
      >
        <TouchableOpacity
          style={styles.devContainer}
          onPress={() => {
            navigation.navigate("About");
          }}
        >
          <Text style={{ color: themeColor.titleText, elevation: 2 }}>
            About Developer
          </Text>
        </TouchableOpacity>

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
  devContainer: {
    padding: 10,
  },
  scrollViewContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
