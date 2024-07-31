import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Alert,
} from "react-native";
import React, { useReducer, useRef } from "react";
import { useDrawerProgress } from "@react-navigation/drawer";
import { DefaultThemeProperty } from "../utils/appThemeStyles";
import { Icon } from "../utils/fontUtils";
import { ProfileMenu, ActionMenuDataSource } from "./ScreenDataSource";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import DrawerItemList from "./DrawerItemList";
import {
  appSettings,
  OpenWebsite,
  SendEmail,
  CallPhone,
  ShareApp,
} from "../utils/appSettings";
import { useAuth } from "../context/AuthContext";

const ProjectItem = ({
  label,
  onPress,
  type,
  name,
  activeItemColor,
  color,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, { backgroundColor: activeItemColor }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon
          type={type}
          name={name}
          color={DefaultThemeProperty.Light_color2}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const ProfileItem = ({ label, onPress, type, name, action, navigation,exitApp }) => {
  const LogoutAction = async () => {
    const handleLogout = async () => {
        return new Promise((resolve, reject) => {
            Alert.alert("Exit", "Are you sure you want to exit?", [
                {
                    text: "Cancel",
                    onPress: () => resolve(false), // Kullanıcı iptal etti.
                    style: "cancel",
                },
                { text: "Yes", onPress: () => resolve(true) }, // Kullanıcı çıkış yapmak istiyor.
            ]);
        });
    };

    // Kullanıcının seçimini bekleyin
    const shouldLogout = await handleLogout();
    // Kullanıcı çıkış yapmak istiyorsa uygulamayı kapatın
    if (shouldLogout) {
        exitApp();
    }
    return true;
};

  const handleEvent = () => {
    switch (action) {
      case "goAbout":
        return navigation?.navigate("Home", {
          screen: "aboutus",
        });
      case "linkPhone":
        return CallPhone();
      case "linkEmail":
        return SendEmail();
      case "linkWebsite":
        return OpenWebsite();
      case "share":
        return ShareApp();
      case "logout":
        return LogoutAction();
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={handleEvent}
      style={[styles.row, { margin: DefaultThemeProperty.spacing / 4 }]}>
      <Icon type={type} name={name} color={DefaultThemeProperty.Gray_color2} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export const CustomDrawer = ({props, userData, exitApp}) => {
  const { state, descriptors, navigation } = props;
  const [user] = useAuth();
  const theme = useColorScheme();
  const scrollRef = useRef(null);

  const [show, toggleProfile] = useReducer((s) => !s, false);

  const fun = () => {
    show
      ? scrollRef.current.scrollTo({
          y: 0,
          animated: true,
        })
      : scrollRef.current.scrollToEnd({
          animated: true,
        });
    toggleProfile();
  };


  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(drawerProgress.value, [0, 1], [-200, 0]);
    return {
      transform: [{ translateX }],
    };
  });

  const viewStyles2 = (type) =>
    useAnimatedStyle(() => {
      const val = type === "top" ? -100 : 100;
      const translateY = interpolate(drawerProgress.value, [0, 1], [val, 0]);
      const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
      return {
        transform: [{ translateY }],
        opacity,
      };
    });

  const username = user.userData.PersonelAdi || "Güncel Yazılım";
  const useremail = user.userData.Email ||"guncel@guncelyazilim.com.tr";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* header */}
        <Animated.View
          style={[
            styles.row,
            styles.view,
            {
              backgroundColor: appSettings.useBasicMenuThema
                ? "transparent"
                : theme === "dark"
                ? DefaultThemeProperty.Gray_color5
                : DefaultThemeProperty.Light_color2,
            },
            styles.marginTop,
            viewStyles2("top"),
          ]}
        >
          <View style={styles.iconContainer}>
            <Image
              style={styles.appIcon}
              source={require("../../assets/icon.png")}
            />
            {/* <Icon name="logo-electron" type={Icons.Ionicons} size={30} /> */}
          </View>
          <Text
            style={styles.headerTitle}
            onPress={() => {
              navigation?.closeDrawer();
            }}
          >
            {appSettings.AppName.toUpperCase()}
          </Text>
        </Animated.View>
        {/* Drawer List Item */}
        <Animated.ScrollView
          ref={scrollRef}
          {...props}
          showsVerticalScrollIndicator={false}
          style={[styles.marginVertical, viewStyles]}
        >
          {/* drawer için is show menu burada işleniyor navigasyona ekleniyor ama menüde gösterilmiyor içerideki ayarlama sayesinde*/}
          <DrawerItemList {...props} styles={styles} />
          {/* 2nd menu */}
          {ActionMenuDataSource.filter((item) => item.isActive === true)
            .length > 0 ? (
            <View
              style={[
                styles.view,
                styles.marginTop,
                {
                  backgroundColor: appSettings.useBasicMenuThema
                    ? "transparent"
                    : theme === "dark"
                    ? DefaultThemeProperty.Gray_color5
                    : DefaultThemeProperty.Light_color2,
                },
                styles.marginVertical,
              ]}
            >
              <Text style={styles.headerTitle}>Quick Actions</Text>
              <View style={styles.separator} />
              {ActionMenuDataSource.filter(
                (item) => item.isActive === true
              ).map((_, i) => (
                <ProjectItem
                  key={i}
                  label={_.title}
                  type={_.iconType}
                  color={_.color}
                  name={_.icon}
                  navigation={navigation}
                />
              ))}
            </View>
          ) : null}
          {/* profile menu */}
          {show ? <View
            style={[
              styles.view,
              styles.marginTop,
              {
                backgroundColor: appSettings.useBasicMenuThema
                  ? "transparent"
                  : theme === "dark"
                  ? DefaultThemeProperty.Gray_color5
                  : DefaultThemeProperty.Light_color2,
              }
            ]}
          >
            <Text style={{ color: DefaultThemeProperty.Gray_color2 }}>
              { username || appSettings.AppName}
            </Text>
            <Text style={{ color: DefaultThemeProperty.Gray_color2 }}>
              {useremail || appSettings.Email}
            </Text>
            <View style={styles.separator} />
            {ProfileMenu.filter((item) => item.isActive === true).map(
              (_, i) => (
                <ProfileItem
                  key={i}
                  label={_.label}
                  type={_.iconType}
                  name={_.icon}
                  action={_.action}
                  navigation={navigation}
                  exitApp={exitApp}
                />
              )
            )}
            {/* - Terms & Condition */}
            <Text
              style={{ color: DefaultThemeProperty.Gray_color2, marginTop: 10 }}
            >
              {appSettings.Version}
            </Text>
          </View>
          :null}
        </Animated.ScrollView>
        {/* footer */}
        <TouchableOpacity onPress={fun}>
          <Animated.View
            style={[
              styles.row,
              styles.view,
              {
                backgroundColor:
                  theme === "dark"
                    ? DefaultThemeProperty.Gray_color5
                    : DefaultThemeProperty.Light_color2,
              },
              styles.marginBottom,
              viewStyles2("bottom"),
            ]}
          >
            <Image
              style={styles.profile}
              source={require("../../assets/profile.jpeg")}
            />
            <View>
              <Text style={styles.headerTitle}>
                {username.substring(0, 20) + (username?.length > 20 ? "..." : "") ||
                  appSettings.AppName}
              </Text>
              <Text style={styles.text}>
                {useremail.substring(0, 20) + (useremail?.length > 20 ? "..." : "") ||
                  appSettings.Email}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    // backgroundColor: DefaultThemeProperty.Light_color2, // bacgrounda renk veriyor! light2 - gray 1
    borderRadius: DefaultThemeProperty.BorderRadius,
    marginHorizontal: DefaultThemeProperty.spacing / 2,
    padding: DefaultThemeProperty.spacing / 1.5,
  },
  marginTop: {
    marginTop: DefaultThemeProperty.spacing / 2,
  },
  marginBottom: {
    marginBottom: DefaultThemeProperty.spacing / 2,
  },
  marginVertical: {
    marginVertical: DefaultThemeProperty.spacing / 2,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: DefaultThemeProperty.spacing / 2,
    justifyContent: "space-between",
    borderRadius: DefaultThemeProperty.BorderRadius,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: DefaultThemeProperty.FontSizeMedium,
    color: DefaultThemeProperty.Gray_color2,
    paddingHorizontal: DefaultThemeProperty.spacing,
  },
  notificationBadge: {
    paddingVertical: DefaultThemeProperty.spacing / 5,
    paddingHorizontal: DefaultThemeProperty.spacing / 2,
    borderRadius: DefaultThemeProperty.BorderRadius / 2,
  },
  iconContainer: {
    padding: DefaultThemeProperty.spacing / 2.4,
    borderRadius: DefaultThemeProperty.BorderRadius,
    margin: DefaultThemeProperty.spacing / 2,
    // backgroundColor: DefaultThemeProperty.CustomPrimaryColor,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: DefaultThemeProperty.Gray_color3,
    marginVertical: DefaultThemeProperty.spacing / 2,
  },
  headerTitle: {
    fontSize: DefaultThemeProperty.FontSizeMedium,
    color: DefaultThemeProperty.Gray_color2,
  },
  text: {
    fontSize: DefaultThemeProperty.FontSizeNormal,
    color: DefaultThemeProperty.Gray_color2,
  },
  profile: {
    marginVertical: DefaultThemeProperty.spacing / 2,
    marginRight: DefaultThemeProperty.spacing,
    marginLeft: DefaultThemeProperty.spacing / 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: DefaultThemeProperty.Light_color2,
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  profileText: {
    color: DefaultThemeProperty.Gray_color2,
  },
});
