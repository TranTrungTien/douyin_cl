import axios, { AxiosRequestConfig } from "axios";
import { servicesPath } from "../services/services_path";

const axiosInitialize = axios.create({
  baseURL: servicesPath.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInitialize;
