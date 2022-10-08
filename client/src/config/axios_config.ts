import axios, { AxiosError } from "axios";
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
    .post<{ message: string; newToken: string }>(
      servicesPath.REFRESH_TOKEN,
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data.newToken);

axiosInitialize.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.config && error.response && error.response.status === 401) {
      if (!refreshTokenPromise) {
        // check for an existing in-progress request
        // if nothing is in-progress, start a new refresh token request
        refreshTokenPromise = getRefreshToken().then((token) => {
          refreshTokenPromise = null; // clear state
          return token; // resolve with the new token
        });
      }

      return refreshTokenPromise
        .then((token) => {
          // error.config // set access token here ...
          localStorage.setItem("token", token);
          error.config.headers &&
            (error.config.headers.Authorization = "Bearer " + token);
          return axiosInitialize(error.config);
        })
        .catch((error) => Promise.reject(error));
    }
    return Promise.reject(error);
  }
);
export default axiosInitialize;
