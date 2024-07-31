//Değerlendirmeler

import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from "react-native";
import DrawerView from "../../navigation/DrawerView";
import { windowWidth } from "../../utils/dimensions";
import WelcomeComp from "../../components/screenComponents/home/WelcomeComp";

import { DefaultThemeProperty } from "../../utils/appThemeStyles";

const Welcome = ({ navigation, route }) => {
  const theme = useColorScheme();
  const fontColor = theme === "dark" ? DefaultThemeProperty.Light_color2 : DefaultThemeProperty.Gray_color3;
  const { properties } = route?.params || {}; // varsayılan olarak boş bir obje

  


  return (
    <DrawerView>
     {/* <WelcomeComp width={(windowWidth / 10) * 10}/> */}
    </DrawerView>
  );
};
export default Welcome;
