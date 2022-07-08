import { Types } from "mongoose";

export interface IFollower {
  id: string;
  author_id: Types.ObjectId;
  blocked: boolean;
  followed_by: Types.ObjectId;
}
