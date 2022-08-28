import { IMusic } from "./music";
import { IUser } from "./user.interface";

export interface IVideo {
  _id: string;
  id_f: string;
  desc: string;
  author_id: IUser;
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
  music_id: IMusic;
  createdAt?: string;
  updatedAt?: string;
}
