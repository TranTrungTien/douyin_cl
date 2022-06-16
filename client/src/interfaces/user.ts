import { video } from "./video";

export interface user {
  _id: string;
  fullName: string;
  nickName: string;
  birthDay: string;
  following: user[];
  follower: user[];
  likes: string;
  videos: video[];
  description: string;
  phoneNumber: string;
}
