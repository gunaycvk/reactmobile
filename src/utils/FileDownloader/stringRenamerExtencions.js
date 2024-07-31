import { MimeTypeHandler } from "./mimeTypeHandler";
import { TurkishToLower } from "./lowerCaseHelper";

export const UrlSubStringParser = (urlData) => {
  return urlData.substring(urlData.lastIndexOf("/") + 1);
};

export const fileRenamer = (str, find, replace) => {
  function escapeRegExp(string) {
    return string.replace(/[.*+?/-_0123456789-_½%&/=^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
};

export const getExtension = (filename) => {
  return (filename.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1];
};

export const replaceAll = (fileName, matchCharacter, replaceCharacter) => {
  const regex = new RegExp(matchCharacter, "g");
  return fileName.replace(regex, replaceCharacter);
};

export const replaceSelectedCharacters = (fileName) => {
  const selectedCharacters = [
    "@",
    "é",
    "!",
    "`",
    '"',
    '"',
    "'",
    "'",
    "+",
    "-",
    "*",
    "_",
    "$",
    "&",
    "{",
    "}",
    "[",
    "]",
    ".",
    ",",
    "<",
    ">",
    "?",
    " ",
    "=",
    "(",
    ")",
    "#",
    ";",
    ":",
    "%",
    "|",
    "^",
  ];
  selectedCharacters.forEach((character) => {
    fileName = replaceAll(fileName, `\\${character}`, "");
  });
  return fileName;
};

export const fixFileName = (url, fileName) => {
  // main Function
  let rawUrl = url ? turkishToLower(url) : null;

  if (url !== null) {
    // url gönderildi
    fileName = urlSubStringParser(rawUrl);
    url = rawUrl.split(fileName)[0];
  }

  const extension = getExtension(fileName);
  const newFileName =
    replaceSelectedCharacters(fileName.split(extension)[0]) + `.${extension}`;

  const result = {
    originalUrl: url ? TurkishToLower(url) : null,
    rawUrl: rawUrl ? TurkishToLower(rawUrl) : null,
    fileExtension: TurkishToLower(extension),
    rawFileName: TurkishToLower(fileName),
    newFileName: TurkishToLower(newFileName),
    noextencionFileName: TurkishToLower(newFileName).replace(
      "." + extension,
      ""
    ),
    mimeType: MimeTypeHandler(extension),
  };

  return result;
};
