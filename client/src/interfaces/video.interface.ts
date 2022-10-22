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
  allow_user_do: {
    comment: boolean;
    duet: boolean;
    stich: boolean;
  };
  who_can_view: string;
  origin_cover: {
    url_list: string[];
  };
  play_addr: {
    url_list: string[];
  };
  createdAt?: string;
  updatedAt?: string;
  music_id: IMusic;
}
