import React from "react";
import { Linking, Platform } from "react-native";
import Constants from "expo-constants";
const projectId = Constants.expoConfig.extra.eas.projectId;
const appname = Constants.expoConfig.name;
const version = Constants.expoConfig.version;

export let appSettings = {
  AppName: appname,
  ServiceAppName: appname,
  Title: appname,
  projectId: projectId,
  Descriptions: appname,
  Adress: "Üçevler, Üçevler Cd. No:9, 16120 Nilüfer/Bursa",
  Website: "https://guncelyazilim.com.tr/",
  Email: "guncel@guncelyazilim.com.tr",
  // EmailButton: "guncel@guncelyazilim.com.tr",
  Phone: "+90 224 443 57 07",
  PhoneButton:"+902244435707",
  Company: "Güncel Yazılım",
  AboutText:"2000 yılında kurulan Güncel Yazılım, işletmelerin verimliliğini ve performansını artıran ERP yazılım çözümlerinde devrim yaratmaya kendini adamıştır. Kritik üretim süreçlerini en son otomasyon sistemleri ile eyleme dönüştürülebilir verilere dönüştürerek, Türk Tekstil Endüstrisi'nin rekabet gücünü artırmak için gerekli teknolojik ilerlemeleri benimsiyoruz. Vizyonumuz, öncelikli Teknolojik Faaliyet Alanları ile uyumlu olup, bizi alanımızda öncüler olarak öne çıkarmaktadır.",
  localstorageUniqKey: "Support_",
  Version: "V"+version,
  DefaultServiceAdress: "https://wiloom.guncelyazilim.com.tr/api/", //process.env.NODE_ENV !== "production" ? :"http://localhost:5154/api/" : https://wiloom.guncelyazilim.com.tr/api/,
  Api_Url:"https://wiloom.guncelyazilim.com.tr/api/", //process.env.NODE_ENV !== "production" ? :"http://localhost:5154/api/" : https://wiloom.guncelyazilim.com.tr/api/,
  Cors: "http://localhost:3000",
  Secret_Key: "yewk$prCndx7j@CGG7$6n@4ptbskE7EHacP*nS&DtZXEqGPWdsXXzag#%d3U",
  LightTheme: true,
  useBasicThemeStyle: false,
  useBasicMenuThema: true,
  AlwaysCheckNetwork: process.env.NODE_ENV === "production" ? true : false,
  RegisterPushNotificationActive: true,
};

export const getDataNow = () => {
  // Bugünün tarihini alıyoruz
  const bugun = new Date();
  // YYYY-MM-DD formatında tarihi oluşturuyoruz
  const yil = bugun.getFullYear();
  const ay = String(bugun.getMonth() + 1).padStart(2, '0'); // Ay sıfır ile başlamalı
  const gun = String(bugun.getDate()).padStart(2, '0'); // Gün sıfır ile başlamalı

  // YYYY-MM-DD formatında tarihi birleştiriyoruz
  const istenenFormat = `${yil}-${ay}-${gun}`;
  return istenenFormat;
};

export const SendEmail = async () => {
  const subject = appSettings.AppName;
  const body = "Merhaba Güncel Yazılım Destek Ekibi , ";

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const url =
    Platform.OS === "android"
      ? `mailto:${appSettings.Email}?subject=${encodedSubject}&body=${encodedBody}`
      : `mailto:${appSettings.Email}?subject=${encodedSubject}&body=${encodedBody}`;
  await Linking.openURL(url);
};

export const CallPhone = async () => {
  const url = `tel:${appSettings.PhoneButton}`.replace(/\s/g, "");
  Linking.openURL(url);
};

export const OpenWebsite = async () => {
  const url = `${appSettings.Website}`.replace(/\s/g, "");
  Linking.openURL(url);
};

export const ShareApp = () => {};
