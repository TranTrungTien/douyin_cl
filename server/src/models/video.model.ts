import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IVideo } from "../interface/video.interface";

const videoSchema = new mongoose.Schema<IVideo>(
  {
    id_f: {
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
    allow_user_do: {
      comment: {
        type: Boolean,
        default: true,
      },
      duet: {
        type: Boolean,
        default: true,
      },
      stich: {
        type: Boolean,
        default: true,
      },
    },
    who_can_view: {
      type: String,
      default: "Public",
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
    desc: {
      type: String,
      default: "",
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    music_id: {
      type: Schema.Types.ObjectId,
      ref: "Music",
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

export default mongoose.model("Video", videoSchema);
