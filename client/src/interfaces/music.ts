import { user } from "./user";
import { video } from "./video";
export interface music {
  _id: string;
  title: string;
  author: user;
  videos: video[];
}
