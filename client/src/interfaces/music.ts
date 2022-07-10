import { IUser } from "./user.interface";

export interface IMusic {
  _id: string;
  id_f: string;
  author_id: IUser;
  isDelete: boolean;
  duration: number;
  cover_large: {
    url_list: string[];
  };
  cover_thumb: {
    url_list: string[];
  };
  play_addr: {
    url_list: string[];
  };
  title: string;
}
