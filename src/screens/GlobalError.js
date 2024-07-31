import React from "react";
import { appSettings } from "../utils/appSettings";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ImageBackground, useColorScheme } from "react-native";
import { VStack, Text } from "@react-native-material/core";
import { CustomButton } from "../components/Buttons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { reloadAsync } from "expo-updates";
import Footer from "../components/Footer";
import { DefaultThemeProperty } from "../utils/appThemeStyles";


function GlobalError({ customMessage }) {
  const theme = useColorScheme();
  const fontColor =theme === "light"? DefaultThemeProperty.Gray_color3: DefaultThemeProperty.Light_color2;


  async function restart() {
    await reloadAsync();
  }

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
      <SafeAreaView>
        <View style={styles.container}>
          <VStack justify="center" spacing={16} style={styles.error_container}>
            <VStack spacing={2}>
              <Text
                variant="h4"
                style={{ fontWeight: "700", color: fontColor }}
              >
                {appSettings.AppName}
              </Text>
            </VStack>
            {customMessage ? null : (
              <Ionicons
                name="wifi-outline"
                size={72}
                style={{ fontWeight: "200" }}
                color={DefaultThemeProperty.Danger_color}
              />
            )}
            <VStack spacing={2}>
              <Text variant="subtitle1" style={{ color: fontColor }}>
                {customMessage ? customMessage : "Network Disconnected"}
              </Text>
              <CustomButton
                label={"Retry"}
                buttonType={"transparent"}
                labelColor={theme === "light" ? "dark" : "light"}
                icon="reload"
                handleFunction={restart}
              />
            </VStack>
          </VStack>
          <Footer />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default GlobalError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error_container: {
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
