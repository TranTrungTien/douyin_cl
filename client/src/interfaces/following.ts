import { IUser } from "./user.interface";

export interface IFollowing {
  _id?: string;
  author_id: string;
  follow: string;
  createdAt?: string;
  updateAt?: string;
}
