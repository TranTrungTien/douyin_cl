import { Types } from "mongoose";

export interface IFollower {
  author_id: Types.ObjectId;
  blocked: boolean;
  followed_by: Types.ObjectId;
}
