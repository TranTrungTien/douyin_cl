import { Types } from "mongoose";

export interface IVideoMusic {
  id: string;
  video_id: Types.ObjectId;
  music_id: Types.ObjectId;
}
