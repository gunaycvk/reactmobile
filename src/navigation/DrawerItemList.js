import { Text, TouchableOpacity, View,useColorScheme } from "react-native";
import React from "react";
import { DefaultThemeProperty } from "../utils/appThemeStyles";
import { appSettings } from "../utils/appSettings";
import {Icon} from "../utils/fontUtils";

const DrawerItemList = ({ state, descriptors, navigation, styles }) => {
  const theme = useColorScheme();
  const DrawerItem = ({
    label,
    onPress,
    tabBarTestID,
    type,
    name,
    notification,
    activeItemColor,
    color,
    styles,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        testID={tabBarTestID}
        accessibilityRole="button"
        style={[styles.drawerItem, { backgroundColor: activeItemColor }]}
      >
        <View style={styles.row}>
          <Icon type={type} name={name} {...{ color }} />
          <Text style={[styles.label, { color }]}>{label}</Text>
        </View>
        {notification > 0 && (
          <View
            style={[
              styles.notificationBadge,
              {
                backgroundColor:
                  notification > 5
                    ? DefaultThemeProperty.Basic_color5
                    : DefaultThemeProperty.Blue_colo5,
              },
            ]}
          >
            <Text>{notification}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };


  return (
    <View style={[styles.view, {backgroundColor: appSettings.useBasicMenuThema ? "transparent" : theme === "dark"? DefaultThemeProperty.Gray_color5:DefaultThemeProperty.Light_color2},]}>
      {state.routes.filter(item => {  {/* drawer için is show menu burada işleniyor navigasyona ekleniyor ama menüde gösterilmiyor filter sayesinde*/}
      const opt = descriptors[item.key].options;
      return opt && opt.item && opt.item.isShowMenu === true;
    }).map((route, index) => {
      const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const drawerItem = options.item;
        const color = isFocused
          ? DefaultThemeProperty.Light_color2
          : DefaultThemeProperty.Gray_color2;
        const activeItemColor = isFocused
          ? DefaultThemeProperty.CustomPrimaryColor
          : null;

        return (
          <DrawerItem
            key={index}
            label={drawerItem.label}
            tabBarTestID={options.tabBarTestID}
            onPress={onPress}
            name={drawerItem.icon}
            type={drawerItem.type}
            notification={drawerItem.notification}
            color={color}
            activeItemColor={activeItemColor}
            styles={styles}
          />
        );
      })}
    </View>
  );
};

export default DrawerItemList;
