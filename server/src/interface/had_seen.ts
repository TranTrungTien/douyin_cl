import { Types } from "mongoose";
export interface IHadSeen {
  author_id: Types.ObjectId;
  had_seen_videos: Types.ObjectId[];
}
