import { Types } from "mongoose";

export interface IMusic {
  id: string;
  author_id: Types.ObjectId;
  origin_video_id: Types.ObjectId;
  isDelete: boolean;
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
}
