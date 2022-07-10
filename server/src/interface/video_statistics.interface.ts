import { Types } from "mongoose";
export interface IStatistics {
  video_id: Types.ObjectId;
  comment_count: number;
  like_count: number;
  share_count: number;
}
