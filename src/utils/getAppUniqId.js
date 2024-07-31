import * as Application from 'expo-application';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {appSettings} from './appSettings';
import * as Crypto from "expo-crypto";

export const getAppUniqId = async () => {
  if (Platform.OS === 'android') {
    return Application.getAndroidId();
  } else {
    let deviceId = await SecureStore.getItemAsync(appSettings.localstorageUniqKey+'_deviceId');
    let uuid = Crypto.randomUUID();
    if (!deviceId) {
      deviceId = JSON.stringify(uuid); //or generate uuid
      await SecureStore.setItemAsync(appSettings.localstorageUniqKey+'_deviceId', deviceId);
    }
    return deviceId;
  }
}