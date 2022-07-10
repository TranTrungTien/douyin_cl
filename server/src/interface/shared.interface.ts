import { Types } from "mongoose";

export interface IYourVideoShared {
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
}
