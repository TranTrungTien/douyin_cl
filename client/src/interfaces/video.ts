import { comment } from "./comment";
import { user } from "./user";

export interface video {
  _id: string;
  title: string;
  author: user;
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
