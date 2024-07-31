import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerScreens, TabScreens, TopTabScreens } from "./ScreenDataSource";
import CustomDrawer from "./CustomDrawer";
import {
  Image,
  Platform,
  StyleSheet,
  Pressable,
  BackHandler,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AboutUs from '../screens/AboutUs';
import { DefaultThemeProperty } from "../utils/appThemeStyles";
import { windowWidth } from "../utils/dimensions";
import { useAuth } from "../context/AuthContext";

const AuthStack = createStackNavigator();
import Login from "../screens/Auth/Login";
import Closed from "../screens/ScreenPages/Closed";
import TaskDetails from "../screens/ScreenPages/TaskDetails";


// Stack
const HomeStack = createNativeStackNavigator();
function HomeStackGroup() {
  const theme = useColorScheme();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="TabsGroup"
        options={{ title: "Home" }}
        component={TabsGroup}
      />
      <HomeStack.Screen
        name="Closed"
        options={{
          headerTintColor: theme === "dark" ? DefaultThemeProperty.Light_color1 : DefaultThemeProperty.Dark_color1,
          headerTitleAlign: "center",
          headerTitle: "Kapalı",
          headerTitleStyle: { fontSize: DefaultThemeProperty.FontSizeLarge },
          unmountOnBlur: true,
        }}
        component={Closed}
      />
      <HomeStack.Screen
        name="TaskDetails"
        options={{
          headerTintColor: theme === "dark" ? DefaultThemeProperty.Light_color1 : DefaultThemeProperty.Dark_color1,
          headerTitleAlign: "center",
          headerTitle: "Görev Detayları",
          headerTitleStyle: { fontSize: DefaultThemeProperty.FontSizeLarge },
          unmountOnBlur: true,
        }}
        component={TaskDetails}
      />
    </HomeStack.Navigator>
  );
}

// Tabs
const Tab = createBottomTabNavigator();
function TabsGroup({ navigation }) {
  const theme = useColorScheme();
  const headerOptions = {
    headerStyle: { backgroundColor: theme === "dark" ? DefaultThemeProperty.Gray_color5 : "white" },
    headerTintColor:theme === "dark" ? DefaultThemeProperty.Light_color1 : DefaultThemeProperty.Dark_color1,
    headerTitleAlign:"center",
    unmountOnBlur: true,
    headerLeft: (tintColor) => (
      <Pressable /**style={{marginLeft:15}} */ onPress={() => navigation.openDrawer()}>
          {/* <Icon
          name={"menu"}
          type={Icons.MaterialIcons}
        /> */}
        <Image
          source={require("../../assets/profile.jpeg")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            marginLeft: 15,
          }}
        />
      </Pressable>
    ),
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerShown:true,
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName = findPageIcons(route.name, focused);
        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
        tabBarActiveTintColor: DefaultThemeProperty.CustomPrimaryColor,
        tabBarInactiveTintColor: "gray",
      })}
    >
       {TabScreens.filter((item) => item.isActive === true).map((_, i) => (
        <Tab.Screen
          key={i}
          name={_.route}
          component={_.route === "Home" ? TopTabsGroup : _.component}
          options={{...headerOptions, headerTitleStyle:{fontSize:DefaultThemeProperty.FontSizeLarge}, tabBarLabelStyle:{marginBottom:5}, headerTitle:_.label, tabBarLabel:_.label, tabBarIcon: ({ focused, color, size }) => {
               return <_.type name={_.icon} size={size} color={color} />;
             }}}
        />
      ))}
    </Tab.Navigator>
  );
}

// Drawer
const Drawer = createDrawerNavigator();

function DrawerGroup({ userData, exitApp }) {
  const theme = useColorScheme();
  return (
    <Drawer.Navigator 
    backBehavior="history" // geri gelme eventinde historysel haraket edebilmesi için gerekli yani goBack veya -1 gibi
      screenOptions={{
        drawerStyle:{width:260, paddingTop:40, backgroundColor: theme === "dark" ? DefaultThemeProperty.Dark_color2:DefaultThemeProperty.Light_color1},
        headerShown: true, //
        unmountOnBlur:true, // camera sorununun çözümü! // camera olan sayfalarda uselayoutta kapatılabilir. fakat sayfada bulunan konumu ve sayfanın hafızasını tutmuyor bunun sadece barkod sayfasına özel kapalı olması gerek! //Unmounting ve State Güncellemesi: unmountOnBlur özelliğini kullanıyorsunuz, bu sayede sayfa arasında geçiş yaparken bileşenlerin unmount edilip edilmediğini kontrol edin. Ayrıca sayfa geçişlerinde state güncellemelerinin beklediğiniz şekilde gerçekleşip gerçekleşmediğini kontrol edin.
        drawerType: "slide", // front 
        swipeEnabled:true,  // drawer kaydırma eventini kapat bazı componentleri buglıyor.
        headerTintColor:theme === "dark" ? DefaultThemeProperty.Light_color1 : DefaultThemeProperty.Dark_color1,
        // overlayColor: "transparent",
        swipeEdgeWidth: Platform.OS === "android" ? windowWidth/6 :25,
        sceneContainerStyle: styles.sceneStyle,
      }}
      drawerContent={(props) =>  <CustomDrawer props={props} userData={userData} exitApp={exitApp} />}
    >
      {DrawerScreens.filter((item) => item.isActive === true).map((_, i) => (
        <Drawer.Screen
          key={i}
          name={_.route}
          component={_.route === "Home" ? HomeStackGroup : _.component}
          options={{
            headerStyle: { backgroundColor: theme === "dark" ? DefaultThemeProperty.Gray_color5 : "white", },
            headerShown: _.route === "Home" ? false : true,
            headerTitleStyle:{fontSize:DefaultThemeProperty.FontSizeLarge},
            headerTitleAlign:"center",
            // headerTitleContainerStyle:{width:300},
            headerTitle:_.label,
            item: _,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

// Top Tabs
const TopTabs = createMaterialTopTabNavigator();
function TopTabsGroup() {
  const theme = useColorScheme();
  return (
    <TopTabs.Navigator
      screenOptions={{
        swipeEnabled:false, // grafiklerin swiper özelliğinden dolayı kapalı olmalı!
        tabBarIndicatorStyle: {
          height: 2,
          backgroundColor: DefaultThemeProperty.CustomPrimaryColor,
        },
       lazy:true,
      }}
    >
     {TopTabScreens.filter((item) => item.isActive === true).map((_, i) => (
        <TopTabs.Screen
          key={i}
          name={_.route}
          // component={_.route === "Home" ? TopTabsGroup : _.component}
          component={_.component}
          options={{tabBarLabelStyle: { fontSize: DefaultThemeProperty.FontSizeNormal,textTransform: "capitalize", }, tabBarLabel:_.label, headerTitle:_.label, 
        }}
        />
      ))}
    </TopTabs.Navigator>
  );
}

export default function Navigation() {
  const theme = useColorScheme();
  const [user,setUser] = useAuth();

  const exitApp = () => {
    setUser({ type: "LOGOUT" });
    BackHandler.exitApp();
  };


  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
    <StatusBar style="auto" />
    {/* <HomeStackGroup /> */}
    {!user.isLoggedIn ? <DrawerGroup userData={user} exitApp={exitApp}/>:(
      <AuthStack.Navigator>
      <AuthStack.Group
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      >
        <AuthStack.Screen name={"Login"} component={Login} />
      </AuthStack.Group>
    </AuthStack.Navigator>
    )}
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    paddingTop:40,
    backgroundColor: "transparent",
  },
});
