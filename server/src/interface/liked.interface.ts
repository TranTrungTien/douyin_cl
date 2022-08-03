import { Types } from "mongoose";

export interface IYourVideoLiked {
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
}

export interface ICommentLiked {
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
  comment_id: Types.ObjectId;
  reply_comment_id?: Types.ObjectId;
}
