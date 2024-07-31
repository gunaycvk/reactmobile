import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useColorScheme
} from "react-native";
import { Ionicons } from "../utils/fontUtils";
import { DefaultThemeProperty } from "../utils/appThemeStyles";

// https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/
// keyboard type = "number-pad" - "default" - "decimal-pad" - "numeric" - "email-address" - "phone-pad" - "ascii-capable" - "numbers-and-punctuation" - "url" - "name-phone-pad" - " visible-password"

export default function InputField({
  placeholder,
  icon,
  inputType,
  inputStyles = null,
  placeholderTextColor = null,
  color= null,
  keyboardType,
  buttonName,
  buttonOnPress = null,
  onchangeTextFunc = null,
  value = null,
  iconColor,
  required = false,
}) {
  const theme = useColorScheme();
  const fontColor = theme === "light" ? DefaultThemeProperty.Gray_color3: DefaultThemeProperty.Light_color2;

  const [showPw, setShowPw] = useState(true);
  const showPassword = () => {
    setShowPw(!showPw);
  };

  return (
    <>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingBottom: 8,
          marginBottom: 8,
        }}
      >
        {inputType == "password" ? (
          <>
            {/* {icon ? <Ionicons name={icon} size={22} style={{padding:10, marginTop:15}} /> : null} */}
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor ?placeholderTextColor : fontColor}
              keyboardType={keyboardType}
              style={[inputStyles === null ? styles.textInput : inputStyles,{color:color ?color : fontColor}]}
              secureTextEntry={showPw}
              value={value} 
              required={true}
              onChangeText={(e) =>
                onchangeTextFunc !== undefined || onchangeTextFunc !== null
                  ? onchangeTextFunc(e)
                  : null
              }
            />
            <TouchableOpacity onPress={showPassword}>
              <Ionicons
                name={"eye"}
                size={22}
                style={{ padding: 10, marginTop: 15, color:iconColor ? iconColor: fontColor }}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor ?placeholderTextColor : fontColor}
              keyboardType={keyboardType}
              style={[inputStyles === null ? styles.textInput : inputStyles,{color:color ?color : fontColor}]}
              value={value} 
              required={required}
              onChangeText={(e) =>
                onchangeTextFunc !== null ? onchangeTextFunc(e) : null
              }
            />
            {icon ? (
              <Ionicons
                name={icon}
                size={22}
                style={{ padding: 10, marginTop: 15, color:iconColor ? iconColor: fontColor }}
              />
            ) : null}
          </>
        )}
      </View>
      {buttonOnPress !== null && buttonName !== null ? (
        <TouchableOpacity onPress={buttonOnPress}>
          <Text style={{ color: color ? color :fontColor, fontWeight: "700" }}>
            {buttonName}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: 'transparent', //#f1f1f1
  },
});
