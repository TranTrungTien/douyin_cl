import mongoose, { Schema } from "mongoose";
import { IStatistics } from "../interface/video_statistics.interface";

const statisticsSchema = new mongoose.Schema<IStatistics>(
  {
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    comment_count: {
      type: Number,
      default: 0,
    },
    like_count: {
      type: Number,
      default: 0,
    },
    stars_count: {
      type: Number,
      default: 0,
    },
    share_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("Statistics", statisticsSchema);
