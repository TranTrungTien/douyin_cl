import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IVideo } from "../interface/video.interface";

const videoSchema = new mongoose.Schema<IVideo>(
  {
    id: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    play_addr: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    origin_cover: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    desc: {
      type: String,
      default: "",
    },
    statistics_id: {
      type: Schema.Types.ObjectId,
      ref: "Statistic",
    },
    music_id: {
      types: Schema.Types.ObjectId,
      ref: "Music",
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

export default mongoose.model("Video", videoSchema);
