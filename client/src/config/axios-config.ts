import { AxiosRequestConfig } from "axios";

export function axiosConfigHeaders(
  responseType: any,
  accept: string,
  contentType: string,
  params: any
): AxiosRequestConfig {
  return {
    responseType: responseType,
    headers: {
      Accept: accept,
      "Content-Type": contentType,
    },
    params: params,
  };
}
