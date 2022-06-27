import { IUser } from "./user.interface";
import { video } from "./video";
export interface music {
  _id: string;
  title: string;
  author: IUser;
  videos: video[];
}
