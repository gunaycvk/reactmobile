import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { DefaultThemeProperty } from "../utils/appThemeStyles";
import { windowWidth, windowHeight } from "../utils/dimensions";

const DynamicPopup = ({
  isVisible,
  header,
  children,
  style,
  callBackCloseFunc,
}) => {
  const theme = useColorScheme();
  const fontColor = theme === "dark"? DefaultThemeProperty.Light_color2: DefaultThemeProperty.Gray_color3;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={() => {
        callBackCloseFunc();
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            theme === "light"
              ? DefaultThemeProperty.Light_color1
              : DefaultThemeProperty.Dark_color2,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
            justifyContent: "center",
            // backgroundColor: DefaultThemeProperty.Transparent_dark,
            alignItems: "center",
          }}
        >
          {callBackCloseFunc && 
                 <TouchableOpacity
                 style={{
                   position: "absolute",
                   top: Platform.OS === "ios" ? StatusBar.currentHeight + 10 : 10,
                   width: 34,
                   height: 34,
                   justifyContent: "center",
                   alignItems: "center",
                   backgroundColor: "transparent",
                   zIndex: 14,
                   right: 10,
                 }}
                 onPress={() => callBackCloseFunc()}
               >
                 <Text
                   style={{
                     fontSize: DefaultThemeProperty.IconSize,
                     color: fontColor,
                   }}
                 >
                   X
                 </Text>
               </TouchableOpacity>
          }
          <ScrollView
            style={{
              width: windowWidth, // Modalın genişliğini ayarlayın
              maxHeight: windowHeight,
              // backgroundColor: DefaultThemeProperty.Transparent_dark,
              borderRadius: 5,
              opacity: 1.0,
            }}
          >
            {header ? (
              <>
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: DefaultThemeProperty.BoldFontWeight,
                    fontSize: DefaultThemeProperty.FontSizeMedium,
                    color: fontColor,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 15,
                    position: "relative",
                  }}
                >
                  {header}
                </Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    marginBottom: 10,
                    marginTop: 10,
                    width: windowWidth,
                    borderColor: DefaultThemeProperty.Warning_color,
                  }}
                ></View>
              </>
            ) : null}
            {children}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DynamicPopup;
