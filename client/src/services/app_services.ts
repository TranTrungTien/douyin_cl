import { AxiosResponse } from "axios";
import Axios from "../config/axios-config";

async function axiosAction<T>(
  url: string,
  method: string,
  data?: any,
  params?: any,
  withCredentials: boolean = false,
  headerContentType: string = "application/json"
) {
  return (await Axios(url, {
    data: data,
    method: method,
    params: params,
    headers: {
      "Content-Type": headerContentType,
    },
    withCredentials: withCredentials,
  })) as AxiosResponse<T>;
}

export function postData<T>(
  url: string,
  data: any,
  withCredentials: boolean = false,
  headerContentType: string = "application/json"
) {
  return axiosAction<T>(
    url,
    "POST",
    data,
    null,
    withCredentials,
    headerContentType
  ).catch((err) => {
    throw err;
  });
}

export function deleteData<T>(
  url: string,
  params: any,
  headerContentType: string = "application/json"
) {
  return axiosAction<T>(
    url,
    "DELETE",
    null,
    params,
    true,
    headerContentType
  ).catch((err) => {
    throw err;
  });
}

export function getData<T>(
  url: string,
  params: any,
  withCredentials: boolean = false,
  headerContentType: string = "application/json"
) {
  return axiosAction<T>(
    url,
    "GET",
    null,
    params,
    withCredentials,
    headerContentType
  );
}
