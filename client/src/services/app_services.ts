import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export async function postData<T>(
  url: string,
  data: any,
  withCredentials: boolean = false,
  headerContentType: string = "application/json"
) {
  return (await axios(url, {
    data: data,
    method: "POST",
    headers: {
      "Content-Type": headerContentType,
    },
    withCredentials: withCredentials,
  })) as AxiosResponse<T>;
}
