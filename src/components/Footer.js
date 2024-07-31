import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Linking } from "react-native";
import { AppThemeStyle } from "../utils/appThemeStyles";
import { windowWidth } from "../utils/dimensions";
import { appSettings } from "../utils/appSettings";
import { DefaultThemeProperty } from "../utils/appThemeStyles";

const Footer = ({color}) => {
  const theme = useColorScheme();
  const fontColor = theme === "dark" ? DefaultThemeProperty.Light_color2: DefaultThemeProperty.Gray_color3;

  return (
    <View style={styles.footerStyle}>
      <View style={styles.termsofServiceText}>
        <Text
          style={[AppThemeStyle.smallText2, { marginLeft: 5,color:color?color:fontColor }]}
          onPress={() =>
            Linking.openURL(
              "https://guncelyazilim.com.tr/gizlilik-ve-guvenlik-politikasi/"
            )
          }
        >
          Gizlilik Politikası
        </Text>
        <Text
          style={[AppThemeStyle.smallText2, { marginLeft: 5, color:color?color:fontColor }]}
          onPress={() =>
            Linking.openURL(
              "https://guncelyazilim.com.tr/kisisel-verilerin-korunmasi/"
            )
          }
        >
          KVKK Aydınlatma Metni|
        </Text>
        <Text
          style={[AppThemeStyle.smallText2, { marginLeft: 5,color:color?color:fontColor }]}
          onPress={() =>
            Linking.openURL(
              "https://guncelyazilim.com.tr/guncel-yazilim-kvkk-basvuru-formu.pdf"
            )
          }
        >
          KVKK Başvuru Formu
        </Text>
      </View>
      <View style={styles.copyrightText}>
        <Text style={[AppThemeStyle.smallText2,{color:color?color:fontColor}]}>
          Copyright © {new Date().getFullYear()} {appSettings.Company} Tüm
          hakları Saklıdır.
        </Text>
      </View>
      <View style={styles.appNameText}>
        <Text style={[AppThemeStyle.smallText2, { fontWeight: 600,color:color?color:fontColor }]}>
          {appSettings.AppName} - {appSettings.Version}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerStyle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: windowWidth,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    height: 100,
  },
  appNameText: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    width: windowWidth,
    flexDirection: "row",
  },
  copyrightText: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    width: windowWidth,
    flexDirection: "row",
  },
  termsofServiceText: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    width: windowWidth,
    flexDirection: "row",
  },
});

export default Footer;
