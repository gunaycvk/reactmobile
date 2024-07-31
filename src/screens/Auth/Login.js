import React, { useState, useEffect } from "react";
import { StyleSheet, Text,SafeAreaView, View, ImageBackground, Switch } from "react-native";
import InputField from "../../components/InputField";
import { CustomButton } from "../../components/Buttons";
import Footer from "../../components/Footer";
import {
  AppThemeStyle,
  DefaultThemeProperty,
} from "../../utils/appThemeStyles";
// EXTRA
import jwt from "jwt-decode";
import { decryptAES, DataEncrypter } from "../../utils/crypter";
import { useAuth } from "../../context/AuthContext";
import { appSettings } from "../../utils/appSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BackHandler, Alert,useColorScheme } from "react-native";
import axios from "axios";
import { getAppUniqId } from "../../utils/getAppUniqId";



const Login = ({ navigation }) => {
  // LOGIN FORM
  const theme = useColorScheme();
  const [user, setUser] = useAuth();
  const { serviceAdress, serviceTestUpdate } = useState("http://support.guncelyazilim.com");
  const [uniqDeviceId, setUniqDeviceId] = useState(null);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const uniqID = await getAppUniqId();
      if(uniqID){
        setUniqDeviceId(uniqID);
      }
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  // USER DATA
  const validateForm = () => {
    return (
      username.length > 0 && password.length > 0 && uniqDeviceId?.length > 0
    );
  };

  
  const onChangeUserName = (userNameValue) => {
    setUsername(userNameValue.toLowerCase());
  };
  const onChangePassword = (passwordValue) => {
    setPassword(passwordValue);
  };

  const handleLogin = (val) => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      loginFunc();
    }, 1000);
  };



  const loginFunc = async () => {
    if (username !== null && password !== null && serviceAdress) {

      return axios
        .post(serviceAdress + "Account/Login", {
          username,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.token;
            if(token){
              const JwtToken = jwt(token);
              AsyncStorage.setItem(
                appSettings.localstorageUniqKey + "Jwt",
                DataEncrypter(token)
              );
              if (JwtToken?.user) {
                const decrypUserData = JSON.parse(decryptAES(JwtToken?.user));
                setUser({
                  type: "SAVE_USER",
                  jwtData: JwtToken,
                  jwtToken:token,
                  userData: decrypUserData,
                });
         
                if (rememberMe === true) {
                  AsyncStorage.setItem(appSettings.localstorageUniqKey + "setUsername",username);
                  AsyncStorage.setItem(appSettings.localstorageUniqKey + "setPassword",password);
                } else {
                  AsyncStorage.removeItem(appSettings.localstorageUniqKey + "setUsername");
                  AsyncStorage.removeItem(appSettings.localstorageUniqKey + "setPassword");
                }
              }
            }else{
              setIsLoading(false);
             
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error?.message || `Invalid Error`);
        });
    }
  };

  ////// LOGIN METHODS
  useEffect(() => {
    autoCheckRememberMe();
  }, []);


  const autoCheckRememberMe = async () => {
    const rememberMeUserName = await AsyncStorage.getItem(appSettings.localstorageUniqKey + "setUsername");
    const rememberMePassword = await AsyncStorage.getItem(appSettings.localstorageUniqKey + "setPassword");
    if (rememberMeUserName !== null && rememberMePassword !== null && rememberMeUserName !== undefined && rememberMePassword !== undefined) {
      setUsername(rememberMeUserName);
      setPassword(rememberMePassword);
      setRememberMe(true);
    }
  };



  useEffect(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
 return () => backHandler.remove();
  }, [user]);


  return (
    <ImageBackground
      source={
        theme === "light"
          ? DefaultThemeProperty.loginLightbg
          : DefaultThemeProperty.loginbg
      }
      style={styles.container}
    >
      <SafeAreaView>       
          <View style={styles.container}>
            <Text
              style={[
                AppThemeStyle.title,
                {
                  color:
                    theme === "light"
                      ? DefaultThemeProperty.Gray_color3
                      : DefaultThemeProperty.Gray_color3,
                },
              ]}
            >
              {appSettings.AppName}
            </Text>
            <Text
              style={[
                AppThemeStyle.subTitle,
                { color: DefaultThemeProperty.Gray_color3 },
              ]}
            >
              {""}
            </Text>
            <InputField
              color={DefaultThemeProperty.Gray_color3}
              placeholderTextColor={DefaultThemeProperty.Gray_color3}
              placeholder={"Username"}
              iconColor={DefaultThemeProperty.Gray_color3}
              keyboardType={"default"}
              icon={"person-outline"}
              value={username}
              required={true}
              onchangeTextFunc={onChangeUserName}
            />
             {username?.length <= 0 && <Text style={{color:"red"}}>Required Username!</Text>}
            <InputField
              color={DefaultThemeProperty.Gray_color3}
              placeholderTextColor={DefaultThemeProperty.Gray_color3}
              iconColor={DefaultThemeProperty.Gray_color3}
              placeholder={"Password"}
              inputType="password"
              icon={"lock-closed-outline"}
              value={password}
              required={true}
              keyboardType={"default"}
              onchangeTextFunc={onChangePassword}
            />
            {password?.length <= 0 && <Text style={{color:"red"}}>Required Password!</Text>}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  AppThemeStyle.default_Text,
                  {
                    color:
                      theme === "light"
                        ? DefaultThemeProperty.Danger_color
                        : DefaultThemeProperty.Gray_color3,
                    fontWeight: 400,
                  },
                ]}
              >
                Remember me?
              </Text>
              <Switch
                label="Remember me?"
                value={rememberMe}
                onValueChange={() => setRememberMe(!rememberMe)}
              />
            </View>
            <CustomButton
              label={"Login"}
              buttonType={!validateForm() ? "gray1" :theme === "light" ? "gray3" : "customprimary"}
              icon="arrow-forward-outline"
              isLoadingActivity={isLoading}
              handleFunction={handleLogin}
              validateDisabled={validateForm}
            />
            <Footer color={DefaultThemeProperty.Gray_color3} />
          </View>
  
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
