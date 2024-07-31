import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { AppThemeStyle, DefaultThemeProperty } from "../utils/appThemeStyles";
import {  Ionicons} from "../utils/fontUtils";

const CustomButton = ({
  handleFunction,
  validateDisabled,
  label,
  labelColor = "light",
  btnWidth = null,
  btnHeight = null,
  fontSize = null,
  IconPackage,
  left,
  right,
  item = null,
  iconSize,
  marginTop,
  marginBottom,
  alignSelf = "center",
  isCircleButton = false, //circle
  icon,
  isLoadingActivity,
  buttonType,
}) => {
  let buttonColors = {
    Style: null,
    borderColor: null,
    labelColor: null,
  };

  switch (buttonType) {
    case "customprimary":
      buttonColors.Style = AppThemeStyle.customprimary_button;
      buttonColors.borderColor = DefaultThemeProperty.Light_color3;
      break;
    case "dark":
      buttonColors.Style = AppThemeStyle.dark_button;
      buttonColors.borderColor = DefaultThemeProperty.Primary_color;
      break;
    case "primary":
      buttonColors.Style = AppThemeStyle.primary_button;
      buttonColors.borderColor = DefaultThemeProperty.Dark_color1;
      break;
    case "light":
      buttonColors.Style = AppThemeStyle.light_button;
      buttonColors.borderColor = DefaultThemeProperty.Dark_color1;
      break;
    case "secondary":
      buttonColors.Style = AppThemeStyle.secondary_button;
      buttonColors.borderColor = DefaultThemeProperty.Secondary_color;
      break;
    case "info":
      buttonColors.Style = AppThemeStyle.info_button;
      buttonColors.borderColor = DefaultThemeProperty.Info_color;
      break;
    case "warning":
      buttonColors.Style = AppThemeStyle.warning_button;
      buttonColors.borderColor = DefaultThemeProperty.Warning_color;
      break;
    case "danger":
      buttonColors.Style = AppThemeStyle.danger_button;
      buttonColors.borderColor = DefaultThemeProperty.Danger_color;
      break;
    case "transparent":
      buttonColors.Style = AppThemeStyle.transparent_button;
      buttonColors.borderColor = DefaultThemeProperty.Transparent_color;
      break;
    case "darkblue":
      buttonColors.Style = AppThemeStyle.darkblue_button;
      buttonColors.borderColor = DefaultThemeProperty.Primary_color;
      break;
    case "darkblue1":
      buttonColors.Style = AppThemeStyle.darkblue1_button;
      buttonColors.borderColor = DefaultThemeProperty.Primary_color;
      break;
    case "darkblue2":
      buttonColors.Style = AppThemeStyle.darkblue2_button;
      buttonColors.borderColor = DefaultThemeProperty.Primary_color;
      break;
    case "gray1":
      buttonColors.Style = AppThemeStyle.gray1_button;
      buttonColors.borderColor = DefaultThemeProperty.Light_color1;
      break;
    case "gray2":
      buttonColors.Style = AppThemeStyle.gray2_button;
      buttonColors.borderColor = DefaultThemeProperty.Light_color1;
      break;
    case "gray3":
      buttonColors.Style = AppThemeStyle.gray3_button;
      buttonColors.borderColor = DefaultThemeProperty.Light_color1;
      break;
    case "red1":
      buttonColors.Style = AppThemeStyle.red1_button;
      buttonColors.borderColor = DefaultThemeProperty.Light_color1;
      break;
    case "red2":
      buttonColors.Style = AppThemeStyle.red2_button;
      buttonColors.borderColor = DefaultThemeProperty.Light_color1;
      break;
    default:
      buttonColors.Style = AppThemeStyle.darkblue_button;
      buttonColors.borderColor = DefaultThemeProperty.Primary_color;
  }

  switch (labelColor) {
    case "dark":
      buttonColors.labelColor = DefaultThemeProperty.Dark_color1;
      break;
    case "light":
      buttonColors.labelColor = DefaultThemeProperty.Light_color1;
      break;
    case "light2":
      buttonColors.labelColor = DefaultThemeProperty.Light_color2;
      break;
    case "primary":
      buttonColors.labelColor = DefaultThemeProperty.Primary_color;
      break;
    case "secondary":
      buttonColors.labelColor = DefaultThemeProperty.Secondary_color;
      break;
    case "secondary2":
        buttonColors.labelColor = DefaultThemeProperty.Green_color3;
      break;
    case "info":
      buttonColors.labelColor = DefaultThemeProperty.Info_color;
      break;
    case "warning":
      buttonColors.labelColor = DefaultThemeProperty.Warning_color;
      break;
    case "danger":
      buttonColors.labelColor = DefaultThemeProperty.Danger_color;
      break;
    case "gray1":
      buttonColors.labelColor = DefaultThemeProperty.Gray_color1;
      break;
    case "gray2":
      buttonColors.labelColor = DefaultThemeProperty.Gray_color2;
      break;
    case "gray3":
      buttonColors.labelColor = DefaultThemeProperty.Gray_color3;
      break;
    case "red1":
      buttonColors.labelColor = DefaultThemeProperty.Red_color1;
      break;
    case "red2":
      buttonColors.labelColor = DefaultThemeProperty.Red_color2;
      break;
    case "darkblue":
      buttonColors.labelColor = DefaultThemeProperty.DarkBlue_color1;
      break;
    case "darkblue1":
      buttonColors.labelColor = DefaultThemeProperty.DarkBlue_color2;
      break;
    case "darkblue2":
      buttonColors.labelColor = DefaultThemeProperty.DarkBlue_color3;
      break;
    default:
      buttonColors.labelColor = DefaultThemeProperty.Light_color1;
  }

  return (
    <TouchableOpacity
      style={[
        buttonColors.Style,
        {
          width: btnWidth ? btnWidth : 150,
          height: btnHeight ? btnHeight : 45,
          left:left,
          right:right,
          fontSize: fontSize ? fontSize : 12,
          alignSelf: alignSelf,
          borderRadius:isCircleButton ? 100 : DefaultThemeProperty.BorderRadius,
          borderColor: buttonColors.borderColor,
          borderWidth: 0.8,
          marginTop:marginTop,
          marginBottom:marginBottom,
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
      onPress={(e) => {
        item !== null ? handleFunction ? handleFunction(item): null : handleFunction ? handleFunction() :null;
      }}
      disabled={validateDisabled !== undefined ? !validateDisabled() : false}
    >
      {isLoadingActivity && (
        <ActivityIndicator
          size="small"
          color={
            labelColor
              ? buttonColors.labelColor
              : DefaultThemeProperty.Light_color1
          }
        />
      )}
      {label ? <Text
        style={[
          AppThemeStyle.default_Text,
          { color: labelColor ? buttonColors.labelColor : null, marginRight:5 },
        ]}
      >
        {label}
      </Text> : null}
      {icon !== null ?(
        !IconPackage  ?
        <Ionicons
          name={icon}
          color={
            labelColor
              ? buttonColors.labelColor
              : DefaultThemeProperty.Light_color1
          }
          style={{ top: 1, }}
          size={iconSize ? iconSize :DefaultThemeProperty.IconSize}
        />: <IconPackage
        name={icon}
        color={
          labelColor
            ? buttonColors.labelColor
            : DefaultThemeProperty.Light_color1
        }
        style={{ top: 1, }}
        size={iconSize ? iconSize: DefaultThemeProperty.IconSize}
      />
      ) : null}
    </TouchableOpacity>
  );
};

export { CustomButton };
