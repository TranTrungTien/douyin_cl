import { AxiosResponse } from "axios";
import Axios from "../config/axios-config";

export type ResponseType = "text" | "json" | "blob" | "arraybuffer";

async function axiosAction<T>(
  url: string,
  method: string,
  data?: any,
  params?: any,
  withCredentials: boolean = false,
  responseType: ResponseType = "json",
  contentType: string = "application/json"
) {
  return (await Axios(url, {
    data: data,
    method: method,
    params: params,
    responseType: responseType,
    headers: {
      "Content-Type": contentType,
    },
    withCredentials: withCredentials,
  }).catch((err) => {
    throw err;
  })) as AxiosResponse<T>;
}

export function postData<T>(
  url: string,
  data: any,
  withCredentials: boolean = false,
  responseType: ResponseType = "json",
  contentType: string = "application/json"
) {
  return axiosAction<T>(
    url,
    "POST",
    data,
    null,
    withCredentials,
    responseType,
    contentType
  ).catch((err) => {
    throw err;
  });
}

export function deleteData<T>(
  url: string,
  params: any,
  responseType: ResponseType = "json",
  contentType: string = "application/json"
) {
  return axiosAction<T>(
    url,
    "DELETE",
    null,
    params,
    true,
    responseType,
    contentType
  ).catch((err) => {
    throw err;
  });
}

export function getData<T>(
  url: string,
  params: any,
  withCredentials: boolean = false,
  responseType: ResponseType = "json",
  contentType: string = "application/json"
) {
  return axiosAction<T>(
    url,
    "GET",
    null,
    params,
    withCredentials,
    responseType,
    contentType
  ).catch((err) => {
    throw err;
  });
}
