import { Types } from "mongoose";

export interface IYourVideoShared {
  id: string;
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
}
