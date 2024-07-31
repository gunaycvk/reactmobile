import { decode as base64_decode, encode as base64_encode } from "base-64";
const CryptoJS = require("crypto-js");

const DataEncrypter = (data) => {
  if (data != null) {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "yewk$prCndx7j@CGG7$6n@4ptbskE7EHacP*nS&DtZXEqGPWdsXXzag#%d3U"
    ).toString();
    const encoded = base64_encode(encryptedData); // şireli datayı base64 yapıyoruz ki parametre olarak iletildiğinde sorun çıkarmasın!
    return encoded ? encoded : null;
  } else {
    return null;
  }
};

const DataDecrypter = (data) => {
  const decoded = base64_decode(data);
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(
    decoded,
    "yewk$prCndx7j@CGG7$6n@4ptbskE7EHacP*nS&DtZXEqGPWdsXXzag#%d3U"
  );
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData ? decryptedData : null;
};


//256 bit için 32 karakter key girildi c# böyle istiyor
const DataEncrypterCsharp = (data) => {
  if (data != null) {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "yewk$prCndx7j@CGG7$6n@4ptbskE7EH"
    ).toString();
    const encoded = base64_encode(encryptedData); // şireli datayı base64 yapıyoruz ki parametre olarak iletildiğinde sorun çıkarmasın!
    return encoded ? encoded : null;
  } else {
    return null;
  }
};

const DataDecrypterCsharp = (data) => {
  const decoded = base64_decode(data);
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(
    decoded,
    "yewk$prCndx7j@CGG7$6n@4ptbskE7EH"
  );
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData ? decryptedData : null;
};



const encryptAES = (input) => {
  var textToEncrypt = input;
  var encryptionKey = "E6DED9837D189CFA85347E5D03D8353C";
  var key = CryptoJS.enc.Utf8.parse(encryptionKey);

  var encrypted = CryptoJS.AES.encrypt(textToEncrypt, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};

const decryptAES = (input) => {
  var encryptionKey = "E6DED9837D189CFA85347E5D03D8353C";
  var key = CryptoJS.enc.Utf8.parse(encryptionKey);

  var ciphertext = CryptoJS.enc.Hex.parse(input);
  var encrypted = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertext,
  });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export {
  DataEncrypter,
  DataDecrypter,
  DataEncrypterCsharp,
  DataDecrypterCsharp,
  encryptAES,
  decryptAES,
};
