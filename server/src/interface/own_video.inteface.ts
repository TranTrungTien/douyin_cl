import { Types } from "mongoose";

export interface IYourOwnVideo {
  id: string;
  author_id: Types.ObjectId;
  video_id: Types.ObjectId;
  isDelete: boolean;
}
