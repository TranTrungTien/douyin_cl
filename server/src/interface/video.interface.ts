import { IUser } from "./user.interface";

export interface IVideo {
  desc: string;
  music: {
    id: string;
    duration: number;
    cover_large: {
      url_list: string[];
    };
    cover_thumb: {
      url_list: string[];
    };
    play_url: {
      url_list: string[];
    };
    title: string;
    author: string;
  };
  statistics: {
    comment_count: number;
    like_count: number;
    share_count: number;
  };
  video_id: string;
  author: IUser;
  video: {
    duration: number;
    origin_cover: {
      url_list: string[];
    };
    play_addr: {
      url_list: string[];
    };
  };
}

const data = {
  desc: "如何笑出猪叫#搞笑 #剧情 #情侣 #恋爱",
  music: {
    id: 7095298918023482000,
    duration: 16,
    cover_large: {
      uri: "1080x1080/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2",
      url_list: [
        "https://p9.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2.jpeg?from=116350172",
        "https://p11.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2.jpeg?from=116350172",
        "https://p26.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2.jpeg?from=116350172",
      ],
    },
    cover_thumb: {
      uri: "168x168/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2",
      url_list: [
        "https://p3.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2~c5_168x168.jpeg?from=116350172",
        "https://p26.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2~c5_168x168.jpeg?from=116350172",
        "https://p11.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2~c5_168x168.jpeg?from=116350172",
      ],
    },
    play_url: {
      uri: "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/7095298910286580516.mp3",
      url_list: [
        "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/7095298910286580516.mp3",
        "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/7095298910286580516.mp3",
      ],
    },
    title: "@老实人张张创作的原声一老实人张张",
    author: "老实人张张",
  },
  statistics: {
    comment_count: 18333,
    digg_count: 132506,
    share_count: 80947,
  },
  author_user_id: 93583281882,
  video_id: "7095298872372727055",
  author: {
    nickname: "老实人张张",
    avatar_thumb: {
      url_list: [
        "https://p26.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2.jpeg?from=116350172",
      ],
    },
    signature: "搞笑日常，每天更新！",
    avatar_larger: {
      uri: "1080x1080/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2",
      url_list: [
        "https://p26.douyinpic.com/aweme/1080x1080/aweme-avatar/tos-cn-avt-0015_d61719ccba7abc2aa3c8bb40d045ffa2.jpeg?from=116350172",
      ],
    },
    uid: "93583281882",
  },
  video: {
    duration: 16183,
    origin_cover: {
      url_list: [
        "https://p26-sign.douyinpic.com/tos-cn-p-0015/1cfc35eca8cc4376b2b9319fa6908d54_1652003010~tplv-dy-360p.jpeg?x-expires=1656572400&x-signature=nf0LZ9IfMZf132OYLPoeACriS%2Fc%3D&from=4257465056&se=false&biz_tag=feed_cover&l=20220616154234010212044035410B9BFE",
      ],
    },
    play_addr: {
      url_list: [
        "https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00fg10000c9rp16rc77u6sqmm2ib0&ratio=720p&line=0",
      ],
    },
  },
};
