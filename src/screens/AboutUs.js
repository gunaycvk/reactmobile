import React, { useLayoutEffect } from "react";
import { appSettings } from "../utils/appSettings";
import {
  StyleSheet,
  View,
  ImageBackground,
  Linking,
  useColorScheme,
  Platform,
  TouchableOpacity,
} from "react-native";
import { VStack, Text } from "@react-native-material/core";
import Footer from "../components/Footer";
import { DefaultThemeProperty } from "../utils/appThemeStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "../utils/fontUtils";

function AboutUs() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useColorScheme();
  const fontColor = theme === "light" ? DefaultThemeProperty.Gray_color3 : DefaultThemeProperty.Light_color3;
  const secondaryColor = theme === "light" ? DefaultThemeProperty.Gray_color3 : DefaultThemeProperty.Light_color1;

  function handleBackButtonClick() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    return true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Ionicons
          name="ios-home"
          size={24}
          style={{ marginRight: 15 }}
          color={
            theme === "light"
              ? DefaultThemeProperty.Dark_color1
              : DefaultThemeProperty.Light_color1
          }
          onPress={() => resetNavigation(true)}
        />
      ),
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          style={{ marginLeft: 15 }}
          color={
            theme === "light"
              ? DefaultThemeProperty.Dark_color1
              : DefaultThemeProperty.Light_color1
          }
          onPress={() => handleBackButtonClick()}
        />
      ),
    });
  }, [theme]);

  const resetNavigation = (isHeaderRightClick) => {
    if (isHeaderRightClick) {
      navigation?.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      /**Optional Custom Functions */
    }
  };

  const encodeURIComponent = (message) => {
    return message.replace(/%20/g, "%20");
  }; // Replace spaces with %20

  const SendEmail = async () => {
    const subject = appSettings.AppName;
    const body = "Merhaba";

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const url =
      Platform.OS === "android"
        ? `mailto:${appSettings.Email}?subject=${encodedSubject}&body=${encodedBody}`
        : `mailto:${appSettings.Email}`;
    await Linking.openURL(`${url}`);
  };

  const CallPhone = async () => {
    const url = `tel:${appSettings.PhoneButton}`.replace(/\s/g, "");
    Linking.openURL(url);
  };

  const OpenWebsite = async () => {
    const url = `${appSettings.Website}`.replace(/\s/g, "");
    Linking.openURL(url);
  };

  return (
    <ImageBackground
      source={
        theme === "light"
          ? DefaultThemeProperty.applightBg
          : DefaultThemeProperty.appBg
      }
      style={styles.container}
      blurRadius={100}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <VStack justify="center" spacing={8} style={styles.content_container}>
          <VStack spacing={2}>
            <Text
              variant="h4"
              style={{ fontWeight: "700", color: secondaryColor }}
            >
              {appSettings.AppName}
            </Text>
          </VStack>
          <VStack spacing={2}>
            <Text style={{ color: fontColor, fontSize: DefaultThemeProperty.FontSizeNormal }}>
              {appSettings.AboutText}
              {/* Türk Tekstil Sektörünün rekabet gücünü arttırma hedefi ile
                belirlenen Öncelikli Teknolojik Faaliyet Konularını, vizyonumuz
                olarak kabul edip, üretimin kritik süreçlerinin işlenebilir
                veriler hale dönüştürülmesini sağlayan otomasyon sistemlerinin
                tasarımı ile bu verilerin işlenerek işletmelerin
                performanslarını ve verimliliklerini en üst seviyelere
                çıkartılmasına katkı sağlayacak ERP yazılım çözümlerinin hayata
                geçirilmesi amacı ile 2000 yılında kurulmuştur. */}
            </Text>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: secondaryColor,
                  marginTop: 10,
                  marginBottom: 10,
                  opacity: 0.5,
                }}
              ></View>

              <Text
                style={{
                  color: secondaryColor,
                  fontSize: DefaultThemeProperty.FontSizeMedium,
                  fontWeight: 600,
                  marginTop: 10,
                }}
              >
                {"Adress"}
              </Text>
              <Text variant="subtitle1" style={{ color: secondaryColor }}>
                {appSettings.Adress}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  OpenWebsite();
                }}
              >
                <Text
                  style={{
                    color: secondaryColor,
                    fontSize: DefaultThemeProperty.FontSizeMedium,
                    fontWeight: 600,
                    marginTop: 10,
                  }}
                >
                  {"Website"}
                </Text>

                <Text variant="subtitle1" style={{ color: secondaryColor }}>
                  {appSettings.Website}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  SendEmail();
                }}
              >
                <Text
                  style={{
                    color: secondaryColor,
                    fontSize: DefaultThemeProperty.FontSizeMedium,
                    fontWeight: 600,
                    marginTop: 10,
                  }}
                >
                  {"Mail"}
                </Text>

                <Text variant="subtitle1" style={{ color: secondaryColor }}>
                  {appSettings.Email}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  CallPhone();
                }}
              >
                <Text
                  style={{
                    color: secondaryColor,
                    fontSize: DefaultThemeProperty.FontSizeMedium,
                    fontWeight: 600,
                    marginTop: 10,
                  }}
                >
                  {"Phone"}
                </Text>
                <Text variant="subtitle1" style={{ color: secondaryColor }}>
                  {appSettings.Phone}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: secondaryColor,
                marginTop: 10,
                marginBottom: 10,
                opacity: 0.5,
              }}
            ></View>
          </VStack>
        </VStack>
        <Footer />
      </View>
    </ImageBackground>
  );
}

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content_container: {
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  error_button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `#343a40`,
    color: `rgba(255, 255, 255, 0.7)`,
  },
  footer_text: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: DefaultThemeProperty.FontSizeNormal,
  },
});
