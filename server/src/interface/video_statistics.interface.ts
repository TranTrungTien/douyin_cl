import { Types } from "mongoose";
export interface IStatistics {
  id: string;
  video_id: Types.ObjectId;
  comment_count: number;
  like_count: number;
  share_count: number;
}
