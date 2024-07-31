import React from "react";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";
import * as Notifications from "expo-notifications";
import { appSettings } from "../appSettings";
import { mimeTypeHandler } from "./mimeTypeHandler";
import { Platform } from "react-native";
const { StorageAccessFramework } = FileSystem;

const FileDownloadSuccessNotification = async (
  fileName,
  uri,
  mimeType,
  fileExtencions
) => {
  const notificationModal = {
    type: "downloadFile",
    fileName: fileName,
    content: uri,
    mimeType: mimeType,
    fileEx: fileExtencions,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${appSettings.Title}` + " Dosya İndirme İşlemi",
      body: `${fileName}` + " Başarıyla indirildi.",
      data: { data: notificationModal },
    },
    trigger: { seconds: 1 }, // bildirim delayı
  });
};

async function DownloadBinaryFile(binaryFileData, binaryFileName) {
  // const data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
  // const base64Code = data.split("data:image/png;base64,")[1];

  const uri = binaryFileData;
  const fileUri = FileSystem.documentDirectory + binaryFileName;

  const fileExtension = binaryFileName.split(".").pop(); // gelen binary datanın uzantısını alır
  const newfileName = binaryFileName.replace("." + fileExtension, "");
  const mimeType = mimeTypeHandler(fileExtension);

  if (Platform.OS === "android") {
    try {
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          newfileName,
          mimeType
        )
          .then(async (curi) => {
            await FileSystem.writeAsStringAsync(curi, uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            await Sharing.shareAsync(fileUri);
            FileDownloadSuccessNotification(
              binaryFileName,
              curi,
              mimeType,
              fileExtension
            );
          })
          .catch((e) => {});
      } catch (e) {
        throw new Error(e);
      }
    } catch (err) {}
  }

  if (Platform.OS === "ios") {
    await Sharing.shareAsync(fileUri);
    FileDownloadSuccessNotification(
      binaryFileName,
      fileUri,
      mimeType,
      fileExtension
    );
  }
}

////////////////////////////////////////////////////////// eğer indirme adresi url olursa aşağıdaki fonksiyon daha sağlıklı çalışır! //////////////////////////////////////////

function DownloadUrlFile(urlData) {
  //this work
  const uri = urlData; //http://techslides.com/demos/sample-videos/small.mp4
  const fileName = urlData.substring(urlData.lastIndexOf("/") + 1);
  let fileUri = FileSystem.documentDirectory + fileName; //"small.mp4"
  FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
      SaveUrlFile(uri, fileName);
    })
    .catch((error) => {
      logHelper("DownloadUrlFile",`catch`,"error",JSON.stringify(error));
    });
}

const SaveUrlFile = async (fileUri, fileName) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  // if (status === "granted") {

  const fileExtension = fileName.split(".").pop(); // gelen binary datanın uzantısını alır
  const newfileName = fileName.replace("." + fileExtension, "");
  const mimeType = mimeTypeHandler(fileExtension);

  if (Platform.OS === "android") {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          newfileName,
          mimeType
        )
          .then(async (curi) => {
            await FileSystem.writeAsStringAsync(curi, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            await Sharing.shareAsync(fileUri);
            FileDownloadSuccessNotification(
              fileName,
              null,
              mimeType,
              fileExtension
            );
          })
          .catch((e) => {});
      } catch (e) {
        throw new Error(e);
      }
    } catch (err) {}
  }

  if (Platform.OS === "ios") {
    await Sharing.shareAsync(fileUri);
    FileDownloadSuccessNotification(fileName, null, mimeType, fileExtension);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const FileDownloader = async (downloadData) => {
  // GELEN TİPE GÖRE BİNARY Mİ URL Mİ ONA GÖRE İNDİRME METHODUNA GÖNDERİR VE DOSYAYI İNDİRİR.
  if (downloadData.downloadType === "Binary") {
    //Url
    DownloadBinaryFile(
      downloadData.binaryData.Itcontent,
      downloadData.binaryData.ItfileName
    );
  } else if (downloadData.downloadType === "Url") {
    // const testtest = "http://techslides.com/demos/sample-videos/small.mp4";
    DownloadUrlFile(downloadData.urlData); //downloadData.urlData  --- /// testtest
  }
};

export default FileDownloader;
