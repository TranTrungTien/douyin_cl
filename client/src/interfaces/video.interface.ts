import { comment } from "./comment";
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
    width: number;
    height: number;
    mimeType: string;
    size: number;
    duration: number;
    origin_cover: {
      url_list: string[];
    };
    play_addr: {
      url_list: string[];
    };
  };
}
