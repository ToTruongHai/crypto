import { currencyIamge } from "./constants";

interface ObjectParam {
  [key: string]: string;
}
export const isBoolean = (value: any) => {
  return typeof value === "boolean";
};

export const isEmpty = (value: any): boolean => {
  if (Array.isArray(value) || typeof value === "string") {
    return value.length === 0;
  } else if (value && typeof value === "object") {
    return Object.keys(value).length === 0;
  } else if (value === null || value === undefined || value === "") {
    return true;
  }
  return false;
};

export const isNumber = (value: any) => typeof value === "number";

export const filterDuplicate = <T extends any>(arr: T[]) =>
  Array.from(new Set([...arr])) as T[];

export const getParamsURL = (objectParam: ObjectParam) => {
  const params = new URLSearchParams();
  Object.keys(objectParam)?.forEach((key, index) => {
    params.set(key, objectParam[key]);
  });
  return "?" + params.toString();
};

export const getCurrencyIcon = (str: any) => {
  const currency = currencyIamge.find((item: any) => item.name === str);
  return currency?.imageURL;
};
