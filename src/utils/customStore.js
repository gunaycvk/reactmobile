import React from "react";
import axios from "axios";
import { appSettings } from "./appSettings";
import { normalizeTurkishChars } from "../utils/lowerCaseHelper";
import { Alert } from "react-native";
import * as Crypto from "expo-crypto";
import moment from "moment/moment";
import { logHelper } from "./logHelper";
import { useAuth } from "../context/AuthContext";
import {encryptAES, decryptAES} from './crypter';
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { serviceAdress, useCustomRoute } from "../context/CurrentRouteContext";

export const DateTimeFormat = (date) => {
  return moment(date).format("DD.MM.YYYY");
};

export const FindMaxAndUniqValuesForFields = (data, fields) => {
  if (
    !Array.isArray(data) ||
    data?.length === 0 ||
    !Array.isArray(fields) ||
    fields?.length === 0
  ) {
    return null;
  }

  let obj = {}; // Her alan için en yüksek değerleri saklayacak nesne

  fields?.forEach((fieldName) => {
    let uniqueValues = [];
    let maxValue = data[0][fieldName];
    let minValue = data[0][fieldName];

    for (let i = 0; i < data.length; i++) {
      if (data[i][fieldName] > maxValue) {
        maxValue = data[i][fieldName];
      }
      if (data[i][fieldName] < minValue) {
        minValue = data[i][fieldName];
      }
      if (!uniqueValues.includes(data[i][fieldName])) {
        uniqueValues.push(String(data[i][fieldName]));
      }
    }
    const sortedUniqueValues = uniqueValues.sort((a, b) => a - b);
    obj[fieldName] = { maxValue, minValue, uniqueValues: sortedUniqueValues };
  });

  if (typeof obj !== "object" || obj === null) {
    return null;
  }

  let max = Number.NEGATIVE_INFINITY;
  let min = Number.POSITIVE_INFINITY;

  for (const key in obj) {
    if (
      typeof obj[key] === "object" &&
      obj[key].hasOwnProperty("maxValue") &&
      obj[key].hasOwnProperty("minValue")
    ) {
      const { maxValue, minValue } = obj[key];
      max = Math.max(max, maxValue);
      min = Math.min(min, minValue);
    }
  }

  return { max, min, obj };
};

export const FindMaxValueInObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }

  let max = Number.NEGATIVE_INFINITY;
  let maxObj = null;
  let maxLabel = null;

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key].hasOwnProperty("maxValue")) {
      const { maxValue } = obj[key];
      if (maxValue > max) {
        max = maxValue;
        maxLabel = key; // Anahtar (label adı) bilgisini kaydediyoruz
        maxObj = obj[key];
      }
    }
  }

  return { label: maxLabel, ...maxObj };
};
//Custom Data Value Modifier
const DataValueModifier = (type, value) => {
  switch (type) {
    case "string":
      return "";
    // return null;
    case "bool":
      return value === 0 ? false : true;
    case "img":
      return value;
    case "byte":
    case "sbyte":
    case "char":
    case "decimal":
    case "double":
    case "float":
    case "int":
    case "uint":
    case "long":
    case "ulong":
    case "short":
    case "ushort":
      return 0;
    case "guid":
      return Crypto.randomUUID();
    case "datetime":
      return new Date().toISOString();
    default:
      if (type.endsWith("_?")) {
        const baseType = type.slice(0, -2);
        return DataValueModifier(baseType, value);
      }
      return null;
  }
};

//Data Type Handler
const getDefaultDataForType = (type) => {
  switch (type) {
    case "string":
      return "";
    // return null;
    case "bool":
      return false;
    case "img":
      return "";
    case "byte":
    case "sbyte":
    case "char":
    case "decimal":
    case "double":
    case "float":
    case "int":
    case "uint":
    case "long":
    case "ulong":
    case "short":
    case "ushort":
      return 0;
    case "guid":
      return Crypto.randomUUID();
    case "datetime":
      return new Date().toISOString();
    default:
      if (type.endsWith("_?")) {
        const baseType = type.slice(0, -2);
        return getDefaultDataForType(baseType);
      }
      return null;
  }
};

// Component Type Handler
export const getDefaultForComponentType = (type) => {
  switch (type) {
    case "string":
      return "text";
    case "bool":
      return "switch";
    case "img":
      return "img";
    case "byte":
    case "sbyte":
    case "char":
    case "decimal":
    case "double":
    case "float":
    case "int":
    case "uint":
    case "long":
    case "ulong":
    case "short":
    case "ushort":
      return "number";
    case "guid":
      return "text";
    case "datetime":
      return "datetime";
    default:
      if (type.endsWith("_?")) {
        const baseType = type.slice(0, -2);
        return getDefaultForComponentType(baseType);
      }
      return null;
  }
};

// DATASOURCE ACTIONS
function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export function getValueOrEmptyString(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  } else {
    return value;
  }
}

export function getValueOrEmptyNumber(value) {
  if (value === null || value === undefined || value === "" || isNaN(value)) {
    return 0;
  } else {
    return value;
  }
}

export const SortFieldsByRowNumber = (fields) => {
  return fields
    ?.slice()
    .sort((a, b) => parseInt(a.rowNumber) - parseInt(b.rowNumber));
};

export const GetAddDataSource = (fields) => {
  const addDataSource = fields
    ? fields
        ?.filter((item) => item.isAddNew === true)
        .reduce((result, item) => {
          result[item.label] = item.defaultValue;
          return result;
        }, {})
    : null;
  return addDataSource;
};

export const GetEditDataSource = (fields) => {
  const addDataSource = fields
    ? fields
        ?.filter((item) => item.isEdit === true)
        .reduce((result, item) => {
          result[item.label] = item.defaultValue;
          return result;
        }, {})
    : null;
  return addDataSource;
};

export const DataSourceDeterminationProccessFunction = (
  rawDataSource,
  rawDataStrucTypes,
  fields,
  isAddNewItem
) => {
  const findDataStruct = (label, dataStrucTypes) => {
    // Eğer dataStrucTypes dizisi boş veya label değeri belirtilmemişse "string" döndürün
    if (!dataStrucTypes || !label) {
      return "string";
    }
    for (const i in dataStrucTypes) {
      const item = dataStrucTypes[i];
      if (item) {
        for (const lbl in item) {
          if (
            normalizeTurkishChars(lbl?.toLowerCase()) ===
            normalizeTurkishChars(label?.toLowerCase())
          ) {
            return item[lbl];
          }
        }
      }
    }
    return "string";
  };

  const determineFieldType = (label, value, dataStrucTypes, index) => {
    const field = fields.find(
      (fld) =>
        normalizeTurkishChars(fld?.label?.toLowerCase()) ===
        normalizeTurkishChars(label?.toLowerCase())
    );
    if (field) {
      const dataStruct = field?.customDataStruck
        ? field?.customDataStruck
        : findDataStruct(label, dataStrucTypes);
      const defaultValues = field?.defaultValue
        ? field.defaultValue
        : getDefaultDataForType(
            normalizeTurkishChars(dataStruct?.toLowerCase())
          );
      const customValue = DataValueModifier(dataStruct, value);
      const fieldValue = isAddNewItem
        ? defaultValues
        : field?.customDataStruck
        ? customValue
        : value != null
        ? value
        : defaultValues;
      return {
        rowNumber: field.rowNumber,
        dataStruct: normalizeTurkishChars(dataStruct?.toLowerCase()),
        isEditReadOnly: field.isEditReadOnly,
        isAddReadOnly: field.isAddReadOnly,
        isEdit: field.isEdit,
        isVisible: field.isVisible,
        isAddNew: field.isAddNew,
        isSearch: field.isSearch,
        isActive: field.isActive,
        label: field.label,
        isRequired: field.isRequired,
        imputMask: field.imputMask,
        value: fieldValue,
        isPrint: field.isPrint,
        caption: field.caption,
        defaultValue: defaultValues,
        lookup: field.lookup,
        lookupProps: field.lookupProps,
      };
    }
    //  } else {
    //    return {rowNumber:index, dataStruct: 'string', isEdit: true,  isVisible: true,isAddNew:false, isSearch:false, isActive:true, label: label, value:fieldValue, caption: field.caption, defaultValue:defaultValues, lookup:null};
    //  }
  };

  const result = rawDataSource
    ? Object.entries(rawDataSource)
        ?.map((item, index) => {
          const fprops = determineFieldType(
            item[0],
            item[1],
            rawDataStrucTypes,
            index
          );
          return { ...fprops };
        })
        .filter(
          (item) =>
            fields.some(
              (element) =>
                normalizeTurkishChars(element?.label?.toLowerCase()) ===
                normalizeTurkishChars(item?.label?.toLowerCase())
            ) &&
            item.label !== undefined &&
            item.label !== null &&
            item?.label !== "Expand" &&
            item?.label !== "$id" &&
            typeof item?.value !== "object" &&
            typeof item?.value !== "array"
        )
    : null;
  return result;
};


export const DataFindPrimaryKeyValueFunc = (data, primaryKey) => {
  const result = Object.entries(data)
    .map((item, index) => {
      if (
        normalizeTurkishChars(item[0].toLocaleLowerCase()) ===
        normalizeTurkishChars(primaryKey.toLocaleLowerCase())
      ) {
        return item[1];
      }
    })
    .filter(
      (item) =>
        item?.label !== "Expand" &&
        item?.label !== "$id" &&
        typeof item?.value !== "object" &&
        typeof item?.value !== "array"
    );
  return {
    key: normalizeTurkishChars(primaryKey.toLocaleLowerCase()),
    value: result[0],
  };
};

export const createDynamicSearchFilterConditions = (searchFilterCheckboxStates, searchExpr, search, currentFilter) => {
  const fields = searchExpr || [];
  const filter = [];
  if(search){
    for (let i = 0; i < fields?.length; i++) {
      if (searchFilterCheckboxStates[fields[i]]) {
        // fields[i] = fields[i].charAt(0).toLowerCase() + fields[i].slice(1); // ilk harfi küçük yapmak için gerekliydi
        filter.push([fields[i], "contains", search]);
        if (i !== fields.length - 1) {
          filter.push("or");
        }
      }
    }
  }

  return currentFilter ? (search && filter?.length > 0 ? [filter, "and", currentFilter ] : currentFilter): search && filter?.length > 0 ? [filter]:null;
};

export function sortByAscAndDesc(data, sortCriteria) {
  const { selector, desc } = sortCriteria[0];
  
  return data.sort((a, b) => {
      const valueA = a[selector];
      const valueB = b[selector];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
          // Tarih string'leri için Date nesnelerine dönüştürme
          if (Date.parse(valueA) && Date.parse(valueB)) {
              return desc 
                  ? new Date(valueB) - new Date(valueA) 
                  : new Date(valueA) - new Date(valueB);
          }
          // String karşılaştırması
          return desc 
              ? valueB.localeCompare(valueA) 
              : valueA.localeCompare(valueB);
      }
      
      // Sayısal karşılaştırma
      return desc 
          ? valueB - valueA 
          : valueA - valueB;
  });
}
// CRUD ACTIONS
export const CustomStore = ({
  dataSourceFunc = null,
  totalCountFunc = null,
  dataStrucTypesFunc = null,
  filterFunc = null,
  sortFunc = null,
  searchOperations = "contains",
  apiUrl,
  usingAxiosWithManuelParams = false,
  user = null,
  selectObj = null,
  searchExpr = [],
  selectGroup,
  customHeaderFilterModel = null,
  skipFunc = 0,
  takeFunc = -1,
  primaryKey = null,
}) => {
 try {
  const [auth] = useAuth();
  // const { serviceAdress, serviceTestUpdate } = useCustomRoute(); // bazı frontend componentlerinde render sorunu yaratabiliyor açma!

  user = auth || null;
  const jwtToken = user?.jwtToken || null;
  const key = primaryKey;
  const loadOptions = {
    requireTotalCount: true,
    searchOperation: searchOperations,
    searchExpr: searchExpr,
    searchValue: selectObj,
    skip: skipFunc,
    take: takeFunc, // ekrana sadece 5 tane getirir.
    sort: sortFunc,
    filter: filterFunc,
    select: selectObj,
    PrimaryKey: key,
    _: Date.now(),
    group: selectGroup,
  };
  return (load = () => {
    let obj = {};
    let params = "?";
    [
        "filter",
        "group",
        "groupSummary",
        "parentIds",
        "requireGroupCount",
        "requireTotalCount",
        "searchExpr",
        "searchOperation",
        "searchValue",
        "select",
        "sort",
        "skip",
        "take",
        "totalSummary",
        "primaryKey",
        "_",
    ].forEach(function (i) {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            obj[i] = loadOptions[i]; // Objeye key-value çifti ekle
            params += `${i}=${JSON.stringify(loadOptions[i])}&`;
        }
    });

    params = params.slice(0, -1);
    const encParams = params? "?params="+base64_encode(encryptAES(JSON.stringify(obj))):"";
    apiUrl = appSettings.Api_Url + apiUrl;

    axios({
      method: "GET",
      url: `${apiUrl}${usingAxiosWithManuelParams === false ? encParams : ""}`, // expand parametresini URL'e ekleyin
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
        // 'CustomFilter': `${customHeaderFilterModel ? JSON.stringify(customHeaderFilterModel) : null}`,
      },
    })
      .then((response) => {
        if (response && response.status !== undefined) {
          dataSourceFunc && dataSourceFunc(response.data.res.data);
          totalCountFunc && totalCountFunc(response.data.res.totalCount, null);
          dataStrucTypesFunc && dataStrucTypesFunc(response.data.type);
        } else {
          if (process.env.NODE_ENV !== "production") {
            console.log("response error")
          }
   
        }
      })
      .catch((err) => {
        if(err.response.status === 404){
        }else{
          logHelper("CustomStore","catch-Error CustomStore","else",`${apiUrl}${params}`+ JSON.stringify(err));
        }
      });
  });
 } catch (error) {
  logHelper("CustomStore","genel catch","",`${apiUrl}${params}`+ JSON.stringify(err));
 }
};
