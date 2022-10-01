import axios from "axios";
import { servicesPath } from "../services/services_path";
export const controller = new AbortController();

const axiosInitialize = axios.create({
  baseURL: servicesPath.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  signal: controller.signal,
});

export default axiosInitialize;
