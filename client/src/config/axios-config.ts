import axios, { AxiosRequestConfig } from "axios";
import { servicesPath } from "../services/services_path";

export function axiosConfigHeaders(
  method: string,
  responseType: any,
  accept: string,
  contentType: string,
  params: any
): AxiosRequestConfig {
  return {
    method: method,
    responseType: responseType,
    headers: {
      Accept: accept,
      "Content-Type": contentType,
    },
    params: params,
  };
}
const axiosInitialize = axios.create({
  baseURL: servicesPath.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInitialize;
