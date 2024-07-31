import React, { useState, useEffect } from "react";
import { useColorScheme, Text, } from "react-native";
import { DefaultThemeProperty } from "../../../utils/appThemeStyles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

const WelcomeComp = ({ width }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const fontColor =theme === "dark"? DefaultThemeProperty.Light_color2: DefaultThemeProperty.Gray_color3;
  const { properties } = route?.params || {}; // varsayılan olarak boş bir obje



  const DATA = [
    {
      title: "burası mı ?",
    },
    {
      title: "",
    },
  ];


  return  <FlashList
  data={DATA}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  estimatedItemSize={200}
/>;
};
export default WelcomeComp;
