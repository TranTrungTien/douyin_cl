import { comment } from "./comment";
import { IUser } from "./user.interface";

export interface video {
  _id: string;
  title: string;
  author: IUser;
  description: string;
  imageCover: string;
  url: string;
  likes: string;
  comment: comment[];
  share: number;
  star: string;
  time: number; //in secs
  size: number; // in kb
}
