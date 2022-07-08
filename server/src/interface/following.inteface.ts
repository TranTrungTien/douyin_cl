import { Types } from "mongoose";

export interface IFollowing {
  id: string;
  author_id: Types.ObjectId;
  follow: Types.ObjectId;
}
