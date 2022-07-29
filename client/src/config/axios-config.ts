import { AxiosRequestConfig } from "axios";

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
