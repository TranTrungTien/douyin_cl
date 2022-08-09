import axios from "axios";

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
  GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR: "comment/liked-comments",
  POST_lIKED_COMMENT: "comment/liked-comments/create-liked-comment",
  DEL_lIKED_COMMENT: "comment/liked-comments/delete-liked-comment",
  GET_ALL_LIKED_COMMENT_IN_OTHER_COMMENT:
    "comment/liked-comments/in-other-comment",
  FOLLOW_USER: "following/create-following",
  CHECK_FOLLOWING: "following/check-following",
  DEL_FOLLOWING: "following/delete-following",
};
