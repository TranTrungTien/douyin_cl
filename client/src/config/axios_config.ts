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

let refreshTokenPromise: Promise<any> | null; // this holds any in-progress token refresh requests

// I just moved this logic into its own function
const getRefreshToken = () =>
  axiosInitialize
    .get("/api/v1/user/refreshToken", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then(() => true);

axiosInitialize.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config && error.response && error.response.status === 401) {
      if (!refreshTokenPromise) {
        // check for an existing in-progress request
        // if nothing is in-progress, start a new refresh token request
        refreshTokenPromise = getRefreshToken().then(() => {
          refreshTokenPromise = null; // clear state
          return; // resolve with the new token
        });
      }

      return refreshTokenPromise.then(() => {
        return axiosInitialize.request(error.config);
      });
    }
    return Promise.reject(error);
  }
);
export default axiosInitialize;
