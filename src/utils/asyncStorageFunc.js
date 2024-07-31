import AsyncStorage from "@react-native-async-storage/async-storage";
import { appSettings } from "./appSettings";

export const SetStoreData = async (key, value) => {
  const valueType = typeof value === "string" ? true : false;
  try {
    const jsonValue = valueType ? String(value) : JSON.stringify(value);
    const localStorageKey = appSettings.localstorageUniqKey + key;
    await AsyncStorage.setItem(localStorageKey, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const GetStoreData = async (key, handleObjectType) => { // string - object
  try {
    const localStorageKey = appSettings.localstorageUniqKey + key;
    const jsonValue = await AsyncStorage.getItem(localStorageKey);
    return jsonValue ? (handleType === "string" ? jsonValue :JSON.parse(jsonValue)) : null;
  } catch (e) {
    // error reading value
  }
};
