import axios, { AxiosRequestConfig } from "axios";

export async function fetchData<T>(url: string, opts?: AxiosRequestConfig) {
  try {
    const dataAxios = await axios.get<T>(url, opts);
    return dataAxios.data;
  } catch (e) {
    throw e;
  }
}
