import React from "react";
import { View, Text } from "react-native";
import axios from "react-native-axios";

const FetchCountriesUrl = "https://covid19.mathdro.id/api/countries";

export const fetchData = async (url) => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    return modifiedData;
  } catch (error) {
    return {
      confirmed: { detail: "", value: null },
      deaths: { detail: "", value: null },
      recovered: { detail: "", value: null },
      lastUpdate: "Data Unavailable",
    };
  }
};

export const fetchCountries = async () => {
  const fetchedCountries = [];
  var i = 0;
  try {
    const {
      data: { countries },
    } = await axios.get(FetchCountriesUrl);

    countries.map((ele) => {
      fetchedCountries.push({
        key: (i++).toString(),
        value: ele.name.toString(),
      });
    });
    return fetchedCountries;
  } catch (error) {
    console.log(error);
  }
};
