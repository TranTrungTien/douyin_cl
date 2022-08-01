import axios, { AxiosRequestConfig } from "axios";

export const setDefaultSettings = () => {
  localStorage.setItem("volume", String(0.1));
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
};

export const servicesPath = {
  SEND_EMAIL: "user/send-mail",
  VERIFY_EMAIL: "user/verify-email",
  LOGIN_WITHOUT_PASSWORD: "user/login-without-password",
  POST_COMMENT: "comment/create-comment",
  GET_ALL_COMMENTS_OF_VIDEO: "comment/",
  POST_METADATA: "media/upload-meta-data",
  POST_FORMDATA: "media/upload-file",
  GET_NEW_RECOMMENDED: "recommendation/new",
  GET_VIDEO_BY_USER: "media/get-video-by-user",
  GET_USER_INFO: "user/info",
  GET_COUNT: "media/get-count",
  GET_METADATA: "media/get-meta-data",
  GET_RELATED_RECOMMENDED: "recommendation/related",
  GET_ALL_VIDEO_LIKED_BY_USER: "media/get-video-liked-by-user",
  GET_REPLY_OF_COMMENT: "comment/reply",
};
