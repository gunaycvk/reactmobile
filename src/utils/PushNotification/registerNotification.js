import react from "react";
import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { appSettings } from "../appSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PushNotificationSender } from "./pushNotificationSender";

const NotificationKey = "AppStartNotification";

async function registerForPushNotificationsAsync(userdata) {
  let token = await getExpoPushTokenAsync();
  if (token) {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#fafafa',
      });
    }
    if (userdata) {
      await UserRegisterToDbPushToken(userdata, token);
    } else {
      await FirstTimeShowPushToken(token);
    }
  }
  return token;
}

const getExpoPushTokenAsync = async () => {
  let token;
  if (Device.isDevice && appSettings.projectId) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      function platformOs() {
        return Platform.OS === "android"
          ? "Enable showing notifications."
          : "Select the app and enable notifications.";
      }
      Alert.alert(
        "Notifications",
        "To receive instant notifications, go to Settings > Notifications > " +
          platformOs(),
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Ok", onPress: () => tryRequestNotification() },
        ]
      );

      async function tryRequestNotification() {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        if (finalStatus === "granted") {
          token = await Notifications.getExpoPushTokenAsync({
            projectId: appSettings.projectId,
          }).data;
          return token;
        }
      }
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: appSettings.projectId })).data;
  } else {
    Alert.alert(
      "Push Notification",
      `You must use a physical device for push notifications.`,
      [{ text: "Ok", onPress: () => {},}]
    )
  }

  return token;
};

const UpdateLocalStorage = async (token) => {
  await AsyncStorage.removeItem(appSettings.localstorageUniqKey + NotificationKey);
  await AsyncStorage.setItem(appSettings.localstorageUniqKey + NotificationKey,token);
};

const FirstTimeShowPushToken = async (token) => {
const AppStartNotification = await AsyncStorage.getItem(appSettings.localstorageUniqKey + NotificationKey);

if (!AppStartNotification) {    // eğer push notification hiç yok ise ilk kayıt ise ekleniyor!
    await UpdateLocalStorage(token);
    await PushNotificationSender(token,null,null,null,null);
  }else{ // eğer var ise ama token değişti ise (cihaz güncellenme durumunda) yeniden gönderiyoruz.
    if(AppStartNotification !== token) {     // cihaz güncelleme durumu var ise tekrardan push notification alarak merge ederek bir kerelik gönderme işlemi yapıyoruz.
      await UpdateLocalStorage(token); // ve update ediyoruz!
      await PushNotificationSender(token,null,null,null,null);
    }else{
      // await PushNotificationSender(token,null,null,null,null); // cihaz aynı ise yollamıyoruz.
    }
  } 
};

const UserRegisterToDbPushToken = async (userdata, token) => {
  const FirmaPersonelId = userdata.Id;
  const NotificationToken = token;
  const apiRequestAdress = "UpdateNotificationToken";
  try {
    const res = await axios.post(
      `${appSettings.Api_Url}User/${apiRequestAdress}`,
      {
        FirmaPersonelId,
        NotificationToken,
      }
    );
    const expoPushToken = res.data;
    UpdateLocalStorage(expoPushToken);
  } catch (error) {
    logHelper("UserRegisterToDbPushToken",`catch`,"Token registration failed!",JSON.stringify(error));
  }
};

export default registerForPushNotificationsAsync;
