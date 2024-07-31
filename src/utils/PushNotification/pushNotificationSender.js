import { appSettings } from "../appSettings";

export const PushNotificationSender = async (
  expoPushToken,
  NTitle,
  NDescriptions,
  NUrl,
  NPageNavigate
) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: NTitle || appSettings.Title,
    body: NDescriptions || `${appSettings.AppName}` + " Hoş Geldiniz.",
    data: {
      data: appSettings.Company,
      url: NUrl || appSettings.Website, // Örnek bir URL atandı ise o url
      navigate: NPageNavigate || null, //yönlendirilecek sayfa var ise o sayfa!
    },
  };

  //test adress : https://expo.dev/notifications
  /// example data json obj: {"data": "Güncel Yazılım", "navigate": null, "url": "https://guncelyazilim.com.tr"}

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};
