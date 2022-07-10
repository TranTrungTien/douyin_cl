import { Types } from "mongoose";

export interface IYourVideoLiked {
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
}
