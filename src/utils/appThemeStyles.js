import React from "react";
import { StyleSheet } from "react-native";
import lightLoginBg from "../../assets/light_login-bg.png";
import lightBg from "../../assets/app_light.png";
import { appSettings } from "./appSettings";
//THEME COMBINE
import darkLoginBg from "../../assets/dark_login-bg.png";
import darkBg from "../../assets/app_dark.png";
import { Platform } from "react-native";

const DefaultThemeProperty = {
  CustomPrimaryColor: "#b40000",
  Primary_color: "#2f94c4",
  Secondary_color: "#40bc7d",
  Info_color: "#17a2b8",
  Warning_color: "#F28C28",
  Danger_color: "#dc3545",
  DarkBlue_color1: "#00101c",
  DarkBlue_color2: "#14222e",
  DarkBlue_color3: "#2b3b47",
  DarkBlue_color4: "#003354",
  Red_color1: "#a85453",
  Red_color2: "#bb6664",
  Red_color3: "#914b4a",
  Red_color4: "#824d4c",
  Red_color5: "#5c2928",
  Red_color6: "#FF6F61",
  Red_color7: "#FF8981",
  Red_color8: "#FFA199",
  Red_color9: "#FFBAB4",
  Red_color10: "#FFD4CC",
  Light_color1: "#f1f1f1",
  Light_color2: "#e4e4e4",
  Light_color3: "#d2d2d2",
  Dark_color1: "#000000",
  Dark_color2: "#1a1a1a",
  Dark_color3: "#3a3a3a",
  Dark_color4: "#282828",
  Gray_color1: "#999999",
  Gray_color2: "#7f878d",
  Gray_color3: "#576269",
  Gray_color4: "#444444",
  Gray_color5: "#3b3b3b",
  Basic_color1: "#ea7a72",
  Basic_color2: "#f8c907",
  Basic_color3: "#82a7c9",
  Basic_color4: "#c2c5d1",
  Basic_color5: "#e892ab",
  Basic_color6: "#83c982",
  Basic_color7: "#c9c482",
  Basic_color8: "#cac14a",
  Green_color: "#039a83",
  Green_color1: "#4dc1a4",
  Green_color2: "#0bd7b8",
  Green_color3: "#00aa75",
  Green_color4: "#29F498",
  Blue_colo1: "#5f8eb6",
  Blue_colo2: "#0077ff",
  Blue_colo3: "#3a7ec7",
  Blue_colo4: "#00478a",
  Blue_colo5: "#a5d7f1",
  Transparent_dark: "#000000e9",
  Transparent_color: "transparent",
  FontSizeSmall: 10,
  FontSizeNormal: 12,
  FontSizeMedium: 14,
  FontSizeLarge: 16,
  TitleFontSize: 24,
  spacing: 16,
  BorderRadius: 10, //
  IconSize: 22,
  NormalFontWeight: 400,
  BoldFontWeight: 600,
  ExtraBoldFontWeight: 700,
  loginbg: darkLoginBg,
  appBg: darkBg,
  sidemenuBg: darkBg,
  loginLightbg: lightLoginBg,
  applightBg: lightBg,
  sidemenuLightBg: lightBg,
};


const getChartColors = [
  { color: "#009FFF", gradientCenterColor: "#006DFF" },
  { color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
  { color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
  { color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  { color: "#FFAD5A", gradientCenterColor: "#FF7F97" },
  { color: "#FF5A5A", gradientCenterColor: "#FF3333" },
  { color: "#FF0000", gradientCenterColor: "#CC0000" },
  { color: "#FFD700", gradientCenterColor: "#FFB200" },
  { color: "#FFEB3B", gradientCenterColor: "#FFD54F" },
  { color: "#CDDC39", gradientCenterColor: "#AFB42B" },
  { color: "#8BC34A", gradientCenterColor: "#689F38" },
  { color: "#4CAF50", gradientCenterColor: "#388E3C" },
  { color: "#009688", gradientCenterColor: "#00796B" },
  { color: "#00BCD4", gradientCenterColor: "#0097A7" },
  { color: "#03A9F4", gradientCenterColor: "#039BE5" },
  { color: "#2196F3", gradientCenterColor: "#1976D2" },
  { color: "#3F51B5", gradientCenterColor: "#303F9F" },
  { color: "#673AB7", gradientCenterColor: "#512DA8" },
  { color: "#9C27B0", gradientCenterColor: "#7B1FA2" },
  { color: "#E91E63", gradientCenterColor: "#C2185B" },
];

const ChartColorPalette = [
  {
    1: {
      frontColor: "#8A2BE2", // Orkide Moru
      sideColor: "#C39EFF", // Açık Orkide Moru
      topColor: "#E3CAFF", // Açık Orkide Moru
      gradientColor: "#8A2BE2", // Orkide Moru
    },
    2: {
      frontColor: "#00FF00", // Yeşil
      sideColor: "#A9FFA9", // Açık Yeşil
      topColor: "#D0FFD0", // Açık Yeşil
      gradientColor: "#00FF00", // Yeşil
    },
  },
  {
    1: {
      frontColor: "#FFA500", // Turuncu
      sideColor: "#FFC766", // Açık Turuncu
      topColor: "#FFD599", // Açık Turuncu
      gradientColor: "#FFA500", // Turuncu
    },
    2: {
      frontColor: "#FF6347", // Nar Çiçeği Rengi
      sideColor: "#FFB0A3", // Açık Nar Çiçeği Rengi
      topColor: "#FFD0C6", // Açık Nar Çiçeği Rengi
      gradientColor: "#FF6347", // Nar Çiçeği Rengi
    },
  },
  {
    1: {
      frontColor: "#006DFF",
      sideColor: "#85E0E0",
      topColor: "#B0EAEB",
      gradientColor: "#009FFF",
    },
    2: {
      frontColor: "#3BE9DE",
      sideColor: "#85E0E0",
      topColor: "#B0EAEB",
      gradientColor: "#93FCF8",
    },
  },
  {
    1: {
      frontColor: "#FFD700", // Altın Rengi
      sideColor: "#FFEC80", // Açık Altın Rengi
      topColor: "#FFF8BF", // Açık Altın Rengi
      gradientColor: "#FFD700", // Altın Rengi
    },
    2: {
      frontColor: "#87CEEB", // Gök Mavisi
      sideColor: "#B0E2FF", // Açık Gök Mavisi
      topColor: "#D4F0FF", // Açık Gök Mavisi
      gradientColor: "#87CEEB", // Gök Mavisi
    },
  },
  {
    1: {
      frontColor: "#8A2BE2", // Orkide Moru
      sideColor: "#C39EFF", // Açık Orkide Moru
      topColor: "#E3CAFF", // Açık Orkide Moru
      gradientColor: "#8A2BE2", // Orkide Moru
    },
    2: {
      frontColor: "#FF0000", // Kırmızı
      sideColor: "#FFA0A0", // Açık Kırmızı
      topColor: "#FFD0D0", // Açık Kırmızı
      gradientColor: "#FF0000", // Kırmızı
    },
  },
  {
    1: {
      frontColor: "#98FB98", // Açık Yeşil
      sideColor: "#C8FFC8", // Açık Yeşil
      topColor: "#E5FFE5", // Açık Yeşil
      gradientColor: "#98FB98", // Açık Yeşil
    },
    2: {
      frontColor: "#FFA07A", // Somon Rengi
      sideColor: "#FFD0B5", // Açık Somon Rengi
      topColor: "#FFEBCC", // Açık Somon Rengi
      gradientColor: "#FFA07A", // Somon Rengi
    },
  },
  {
    1: {
      frontColor: "#FFC0CB", // Pembe
      sideColor: "#FFD9E1", // Açık Pembe
      topColor: "#FFEBF0", // Açık Pembe
      gradientColor: "#FFC0CB", // Pembe
    },
    2: {
      frontColor: "#FFB6C1", // Açık Pembe
      sideColor: "#FFCED1", // Pembe Tonu
      topColor: "#FFE6E6", // Açık Pembe
      gradientColor: "#FFB6C1", // Açık Pembe
    },
  },
];

const AppThemeStyle = StyleSheet.create({
  primary_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Primary_color,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  transparent_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  darkblue_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.DarkBlue_color1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  darkblue1_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.DarkBlue_color2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  darkblue2_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.DarkBlue_color3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  secondary_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Secondary_color,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  info_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Info_color,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  warning_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Warning_color,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  danger_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Danger_color,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  customprimary_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.CustomPrimaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  dark_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Dark_color1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  light_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Light_color1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  light2_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Light_color2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  gray1_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Gray_color1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  gray2_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Gray_color2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  gray3_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Gray_color3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  red1_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Red_color1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  red2_button: {
    padding: 5,
    minWidth: 20,
    marginLeft: 5,
    backgroundColor: DefaultThemeProperty.Red_color2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  default_Text: {
    color: DefaultThemeProperty.Light_color1,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  light_Text2: {
    color: DefaultThemeProperty.Light_color2,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  primary_Text: {
    color: DefaultThemeProperty.Primary_color,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  darkblue_Text: {
    color: DefaultThemeProperty.DarkBlue_color1,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  secondary_Text: {
    color: DefaultThemeProperty.Secondary_color,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  info_Text: {
    color: DefaultThemeProperty.Info_color,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  warning_Text: {
    color: DefaultThemeProperty.Warning_color,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  danger_Text: {
    color: DefaultThemeProperty.Danger_color,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  dark_Text: {
    color: DefaultThemeProperty.Dark_color1,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  gray1_Text: {
    color: DefaultThemeProperty.Gray_color1,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  gray2_Text: {
    color: DefaultThemeProperty.Gray_color2,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  gray3_Text: {
    color: DefaultThemeProperty.Gray_color3,
    textAlign: "center",
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  default_border_Radius: {
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  default_font_Size: {
    fontSize: DefaultThemeProperty.FontSizeMedium,
  },
  title: {
    fontSize: 40,
    color: appSettings.LightTheme
      ? DefaultThemeProperty.Gray_color3
      : DefaultThemeProperty.Light_color2,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: DefaultThemeProperty.Gray_color1,
  },
  smallText: {
    fontSize: 8,
    color: DefaultThemeProperty.Light_color2,
  },
  smallText2: {
    fontSize: DefaultThemeProperty.FontSizeSmall,
    color: DefaultThemeProperty.Light_color2,
  },
});

const GradientColors = [
  DefaultThemeProperty.Dark_color2,
  DefaultThemeProperty.Gray_color4,
];
const GradientLightColors = [
  DefaultThemeProperty.Light_color1,
  DefaultThemeProperty.Light_color3,
];

const BaseThemeStyles = {
  tabBarStyle: {
    display: "flex",
    paddingTop: 5,
    paddingBottom: Platform.OS === "ios" ? 35 : 15,
    height: Platform.OS === "ios" ? 100 : 70,
  },
  headerBase: {
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerShown: false,
  },
  drawerBae: {
    drawerStatusBarAnimation: "fade",
    swipeEnabled: true,
    drawerType: "slide", // slide
  },
  generalOptions: {
    // unmountOnBlur: true, // camera sorununun çözümü! // fakat sayfada bulunan konumu ve sayfanın hafızasını tutmuyor bunun sadece barkod sayfasına özel kapalı olması gerek! //Unmounting ve State Güncellemesi: unmountOnBlur özelliğini kullanıyorsunuz, bu sayede sayfa arasında geçiş yaparken bileşenlerin unmount edilip edilmediğini kontrol edin. Ayrıca sayfa geçişlerinde state güncellemelerinin beklediğiniz şekilde gerçekleşip gerçekleşmediğini kontrol edin.
    // unmountOnBlur: false,
    swipeEnabled: false, // drawer kaydırma eventini kapat bazı componentleri buglıyor.
    headerTitleAlign: "center",
    headerShown: false,
    headerBackTitleVisible: false,
    // headerBackTitle:"Geri",
    headerRight: () => <></>,
    headerRight: () => <></>,
  },
};

const NavigationStyle = {
  tabBarBadgeStyle: {
    backgroundColor: DefaultThemeProperty.DarkBlue_color1,
  }, // tabbar badge color
  tabBarActiveTintColor: DefaultThemeProperty.Primary_color, // tabbar active icon color
  tabBarInactiveTintColor: DefaultThemeProperty.Gray_color1,
  tabBarStyle: {
    ...BaseThemeStyles.tabBarStyle,
    backgroundColor: DefaultThemeProperty.DarkBlue_color1, // tabbar bacground color
  },
  ...BaseThemeStyles.headerBase,
  headerTintColor: DefaultThemeProperty.Light_color1, // font color
  headerStyle: {
    backgroundColor: DefaultThemeProperty.DarkBlue_color1, //header  bacground color
  }, // bacground color
  drawerScreenOptions: {
    ...BaseThemeStyles.drawerBae,
    drawerActiveBackgroundColor: DefaultThemeProperty.DarkBlue_color1,
    drawerActiveTintColor: DefaultThemeProperty.Primary_color,
    drawerInactiveTintColor: DefaultThemeProperty.Light_color2,
    drawerLabelStyle: {
      marginLeft: -25,
      fontSize: DefaultThemeProperty.FontSizeMedium,
    },
  },
};

const NavigationLightStyle = {
  tabBarBadgeStyle: {
    backgroundColor: DefaultThemeProperty.DarkBlue_color1,
  }, // tabbar badge color
  tabBarActiveTintColor: DefaultThemeProperty.Primary_color, // tabbar active icon color
  tabBarInactiveTintColor: DefaultThemeProperty.Gray_color1,
  tabBarStyle: {
    ...BaseThemeStyles.tabBarStyle,
    backgroundColor: DefaultThemeProperty.Gray_color3, // tabbar bacground color
  },
  ...BaseThemeStyles.headerBase,
  headerTintColor: DefaultThemeProperty.Light_color1, // font color
  headerStyle: {
    backgroundColor: DefaultThemeProperty.Gray_color3, //header  bacground color
  }, // bacground color
  drawerScreenOptions: {
    ...BaseThemeStyles.drawerBae,
    drawerActiveBackgroundColor: DefaultThemeProperty.Gray_color3,
    drawerActiveTintColor: DefaultThemeProperty.Light_color1,
    drawerInactiveTintColor: DefaultThemeProperty.Gray_color2,
    drawerLabelStyle: {
      marginLeft: -25,
      fontSize: DefaultThemeProperty.FontSizeMedium,
    },
  },
};

const NavigationOptions = {
  tabBarStyle: NavigationStyle.tabBarStyle,
  tabBarBadgeStyle: NavigationStyle.tabBarBadgeStyle,
  tabBarActiveTintColor: NavigationStyle.tabBarActiveTintColor, // tabbar active icon color
  tabBarInactiveTintColor: NavigationStyle.tabBarInactiveTintColor,
  headerStyle: NavigationStyle.headerStyle,
  headerTintColor: NavigationStyle.headerTintColor,
  ...BaseThemeStyles.generalOptions,
};

const NavigationLightOptions = {
  // unmountOnBlur: true, // camera sorununun çözümü! // fakat sayfada bulunan konumu ve sayfanın hafızasını tutmuyor bunun sadece barkod sayfasına özel kapalı olması gerek! //Unmounting ve State Güncellemesi: unmountOnBlur özelliğini kullanıyorsunuz, bu sayede sayfa arasında geçiş yaparken bileşenlerin unmount edilip edilmediğini kontrol edin. Ayrıca sayfa geçişlerinde state güncellemelerinin beklediğiniz şekilde gerçekleşip gerçekleşmediğini kontrol edin.
  tabBarStyle: NavigationLightStyle.tabBarStyle,
  tabBarBadgeStyle: NavigationLightStyle.tabBarBadgeStyle,
  tabBarActiveTintColor: NavigationLightStyle.tabBarActiveTintColor, // tabbar active icon color
  tabBarInactiveTintColor: NavigationLightStyle.tabBarInactiveTintColor,
  headerStyle: NavigationLightStyle.headerStyle,
  headerTintColor: NavigationLightStyle.headerTintColor,
  ...BaseThemeStyles.generalOptions,
};

export {
  AppThemeStyle,
  DefaultThemeProperty,
  NavigationStyle,
  NavigationLightStyle,
  NavigationOptions,
  NavigationLightOptions,
  GradientColors,
  GradientLightColors,
  ChartColorPalette,
  getChartColors,
};
