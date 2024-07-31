import React from "react";

const TurkishToUpper = (stringVal) => {
  if (!stringVal) return "";
  var string = stringVal;
  var letters = { i: "İ", ş: "Ş", ğ: "Ğ", ü: "Ü", ö: "Ö", ç: "Ç", ı: "I" };
  string = string?.replace(/(([iışğüçö]))/g, function (letter) {
    return letters[letter];
  });

  return string.toUpperCase();
};

const TurkishToLower = (stringVal) => {
  if (!stringVal) return "";
  let string = stringVal;
  const letters = { İ: "i", I: "ı", Ş: "ş", Ğ: "ğ", Ü: "ü", Ö: "ö", Ç: "ç" };
  string = string?.replace(
    /(([İIŞĞÜÇÖ]))/g,
    (letter) => letters[letter.toUpperCase()]
  );
  return string?.toLowerCase();
};

const turkishChars = {
  ı: "i",
  i: "i",
  ş: "s",
  ğ: "g",
  ü: "u",
  ç: "c",
  ö: "o",
};
// Türkçe karakterleri düzeltmek için fonksiyon
const normalizeTurkishChars = (str) => {
  return str?.replace(/[ıişğüçö]/g, (char) => turkishChars[char] || char);
};

const convertLabelName = (label) => {
  if (!label) {
    return "";
  }

  const turkishToEnglishMap = {
    ı: "I",
    i: "I",
    ğ: "G",
    ş: "S",
    ü: "U",
    ö: "O",
    ç: "C",
    // Diğer Türkçe harf dönüşümleri buraya eklenebilir.
  };

  const firstChar = label.charAt(0);
  const convertedFirstChar =
    turkishToEnglishMap[firstChar?.toLowerCase()] || firstChar;

  return convertedFirstChar.toUpperCase() + label.slice(1);
};

export {
  TurkishToUpper,
  TurkishToLower,
  normalizeTurkishChars,
  convertLabelName,
};
