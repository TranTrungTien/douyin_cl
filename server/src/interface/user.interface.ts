export interface IUser {
  email: string;
  password: string;
  avatar_larger: {
    url_list: string[];
  };
  avatar_thumb: {
    url_list: string[];
  };
  cover_url: {
    url_list: string[];
  };
  favoriting_count: number;
  follower_count: number;
  follower_request_status: number;
  following_count: number;
  ip_location: string;
  is_blocked: boolean;
  is_effect_artist: boolean;
  is_gov_media_vip: boolean;
  nickname: string;
  original_musician: {
    music_count: number;
  };
  share_info: {
    share_desc: string;
    share_image_url: {
      url_list: string[];
    };
    share_url: string;
  };
  show_favorite_list: boolean;
  signature: string;
  signature_language: string;
  total_favorited: number;
  uid: string;
  createdAt?: string;
  updatedAt?: string;
}

const data = {
  avatar_larger: {
    url_list: [
      "https://p3-pc.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_b500cab775aae2fc0854f2a9dd76ecd6.jpeg?from=2956013662",
    ],
  },
  avatar_thumb: {
    url_list: [
      "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_b500cab775aae2fc0854f2a9dd76ecd6.jpeg?from=2956013662",
    ],
  },
  cover_url: {
    url_list: [
      "https://p3-pc-sign.douyinpic.com/obj/douyin-user-image-file/2159f2ef820dde0a084d8758398db989?x-expires=1655888400&x-signature=gZ6djKO7e3I%2Fo97wBtlEdexG%2Fvs%3D&from=2480802190",
    ],
  },
  favoriting_count: 3316,
  follower_count: 150198,
  follower_request_status: 0,
  following_count: 27,
  ip_location: "IP属地：重庆",
  is_activity_user: false,
  is_blocked: false,
  is_effect_artist: false,
  is_gov_media_vip: false,
  nickname: "rose朴彩英",
  original_musician: {
    music_count: 0,
  },
  sec_uid:
    "MS4wLjABAAAAdMr1prPVzcB69WhNY3OF0hDmoajMgPnUvloqaytXYBdZrXWgpCe5k2bqiQy6O7Rf",
  share_info: {
    share_desc: "长按复制此条消息，打开抖音搜索，查看TA的更多作品。",
    share_image_url: {
      url_list: [
        "https://p6-pc-sign.douyinpic.com/obj/tos-cn-p-0015/af15b7688bd04529a13ce5310126318e_1655547002?x-expires=1655888400&x-signature=PxjUGZg2QEXb4I%2F6JRvYdswGOyw%3D&from=2480802190",
      ],
    },
    share_url:
      "www.iesdouyin.com/share/user/MS4wLjABAAAAdMr1prPVzcB69WhNY3OF0hDmoajMgPnUvloqaytXYBdZrXWgpCe5k2bqiQy6O7Rf?did=MS4wLjABAAAAimqqUMZn7DKELiDlg7wo02K_DXIz4d0Rtx1YHKyxJrm-mjWorQPIyjSUsqhW__YK&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&sec_uid=MS4wLjABAAAAdMr1prPVzcB69WhNY3OF0hDmoajMgPnUvloqaytXYBdZrXWgpCe5k2bqiQy6O7Rf",
  },
  show_favorite_list: true,
  signature: "持续更新四闺女名场面.\n制作不易，请勿搬运.\n感谢大家的关注👍.",
  signature_language: "zh",
  total_favorited: 9737901,
  uid: "3869868743728935",
};
