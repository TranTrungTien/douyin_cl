import { Types } from "mongoose";

export interface IYourVideoLiked {
  id: string;
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
}
