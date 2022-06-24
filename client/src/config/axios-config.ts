import { AxiosRequestConfig } from "axios";

export const mediaHeader: AxiosRequestConfig = {
  responseType: "blob",
  headers: {
    Accept: "video/mp4",
    "Content-Type": "video/mp4",
  },
};
export const metaDataHeader: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
