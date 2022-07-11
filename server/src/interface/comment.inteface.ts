import { Types } from "mongoose";

export interface IComment {
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
  text: string;
  reply_comment_id?: Types.ObjectId;
  reply_count: number;
  like_count: number;
  delete_comment: boolean;
  createdAt?: string;
  updatedAt?: string;
}
