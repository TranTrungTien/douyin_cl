import axios from "axios";
export const servicesPath = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  GET_ALL_FOLLOWING: "/api/v1/following",
  GET_MY_INFO: "/api/v1/user",
  SEND_EMAIL: "/api/v1/user/send-mail",
  VERIFY_EMAIL: "/api/v1/user/verify-email",
  LOGIN_WITHOUT_PASSWORD: "/api/v1/user/login-without-password",
  POST_COMMENT: "/api/v1/comment/create-comment",
  GET_ALL_COMMENTS_OF_VIDEO: "/api/v1/comment/",
  POST_METADATA: "/api/v1/media/upload-meta-data",
  POST_FORMDATA: "/api/v1/media/upload-file",
  GET_NEW_RECOMMENDED: "/api/v1/recommendation/new",
  GET_VIDEO_BY_USER: "/api/v1/media/get-video-by-user",
  GET_USER_INFO: "/api/v1/user/info",
  GET_COUNT: "/api/v1/media/get-count",
  GET_METADATA: "/api/v1/media/get-meta-data",
  GET_RELATED_RECOMMENDED: "/api/v1/recommendation/related",
  GET_ALL_VIDEO_LIKED_BY_USER: "/api/v1/media/get-video-liked-by-user",
  GET_REPLY_OF_COMMENT: "/api/v1/comment/reply",
  GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR: "/api/v1/comment/liked-comments",
  POST_lIKED_COMMENT: "/api/v1/comment/liked-comments/create-liked-comment",
  DEL_lIKED_COMMENT: "/api/v1/comment/liked-comments/delete-liked-comment",
  GET_ALL_LIKED_COMMENT_IN_OTHER_COMMENT:
    "comment/liked-comments/in-other-comment",
  FOLLOW_USER: "/api/v1/following/create-following",
  CHECK_FOLLOWING: "/api/v1/following/check-following",
  DEL_FOLLOWING: "/api/v1/following/delete-following",
};
export const setDefaultSettings = () => {
  localStorage.setItem("volume", String(0.1));
  axios.defaults.baseURL = servicesPath.BASE_URL;
};
