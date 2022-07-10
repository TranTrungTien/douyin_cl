import { Types } from "mongoose";

export interface IFollowing {
  author_id: Types.ObjectId;
  follow: Types.ObjectId;
}
