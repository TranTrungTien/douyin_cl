import { AxiosRequestConfig } from "axios";
import Axios from "../config/axios-config";

export async function fetchData<T>(url: string, opts?: AxiosRequestConfig) {
  try {
    const dataAxios = await Axios.get<T>(url, opts);
    return dataAxios.data;
  } catch (e) {
    throw e;
  }
}
