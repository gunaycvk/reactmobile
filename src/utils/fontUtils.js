import React from 'react';
import { DefaultThemeProperty } from './appThemeStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Zocial } from '@expo/vector-icons'; 

export {
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
  EvilIcons,
  Zocial,
};


export const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
    Zocial
}

export const IconPackageFinder = (packageName) => {
  switch (packageName) {
    case "Ionicons":
      return Ionicons;
    case "Feather":
      return Feather;
    case "AntDesign":
      return AntDesign;
    case "FontAwesome5":
      return FontAwesome5;
    case "Entypo":
      return Entypo;
    case "MaterialCommunityIcons":
      return MaterialCommunityIcons;
    case "SimpleLineIcons":
      return SimpleLineIcons;
    case "EvilIcons":
      return EvilIcons;
    default:
      return null;
  }
};

export const Icon = ({ type, name, color, size = 24, style }) => {
  const fontSize = DefaultThemeProperty.IconSize;
  const Tag = type;
  return (
      <>
          {type && name && (
              <Tag name={name} size={size || fontSize} color={color} style={style} />
          )}
      </>
  )
}