import * as WebBrowser from "expo-web-browser";

export const PushNotificationClickHandler = async (response, navigationRef) => {
  const url = response.notification.request.content.data?.url;
  const navigationScreen = response.notification.request.content.data?.navigate;
  if (url) {
    await WebBrowser.openBrowserAsync(url);
  }
  if (navigationScreen) {
    navigationRef.current?.navigate(navigationScreen);
  }
};
