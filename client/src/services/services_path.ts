export const servicesPath = {
  BASE_URL: process.env.REACT_APP_BASE_URL,

  LOGIN: "/api/v1/user/login",

  GET_MY_INFO: "/api/v1/user",
  CREATE_USER: "/api/v1/user/save",
  GET_USER_INFO: "/api/v1/user/info",
  SEND_EMAIL: "/api/v1/user/send-mail",
  VERIFY_EMAIL: "/api/v1/user/verify-email",
  LOGIN_WITHOUT_PASSWORD: "/api/v1/user/login-without-password",

  GET_NEW_RECOMMENDED: "/api/v1/recommendation/new",
  GET_RECOMMENDED_BASED_ON_USER: "/api/v1/recommendation/list",
  GET_RELATED_RECOMMENDED: "/api/v1/recommendation/related",
  GET_SEARCH_RECOMMENDED: "/api/v1/recommendation/search",

  POST_METADATA: "/api/v1/media/upload-meta-data",
  POST_FORMDATA: "/api/v1/media/upload-file",

  GET_VIDEO_BY_USER: "/api/v1/media/get-video-by-user",
  GET_ALL_VIDEO_LIKED_BY_USER: "/api/v1/media/get-video-liked-by-user",
  GET_COUNT: "/api/v1/media/get-count",
  GET_METADATA: "/api/v1/media/get-meta-data",

  POST_COMMENT: "/api/v1/comment/create-comment",
  POST_lIKED_COMMENT: "/api/v1/comment/liked-comments/create-liked-comment",
  GET_ALL_COMMENTS_OF_VIDEO: "/api/v1/comment/",
  GET_REPLY_OF_COMMENT: "/api/v1/comment/reply",
  GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR: "/api/v1/comment/liked-comments",
  DEL_lIKED_COMMENT: "/api/v1/comment/liked-comments/delete-liked-comment",
  GET_ALL_LIKED_COMMENT_IN_OTHER_COMMENT:
    "/api/v1/comment/liked-comments/in-other-comment",

  GET_ALL_FOLLOWING: "/api/v1/following",
  FOLLOW_USER: "/api/v1/following/create-following",
  CHECK_FOLLOWING: "/api/v1/following/check-following",
  BLOCK_USER: "/api/v1/following/blocked-user-by-author",
  DEL_FOLLOWING: "/api/v1/following/delete-following",

  POST_LIKE_VIDEO: "/api/v1/user-actions/create-liked",
  CHECK_LIKED: "/api/v1/user-actions/check-liked",
  DEL_LIKE_VIDEO: "/api/v1/user-actions/delete-liked",

  GET_STATISTICS_OF_VIDEO: "/api/v1/statistics/video",
  GET_STATISTICS_OF_LIST: "/api/v1/statistics/list",
};
