import mongoose, { Schema } from "mongoose";
import { IYourVideoLiked } from "../interface/liked.interface";
import { IMusic } from "../interface/music.inteface";

const musicSchema = new mongoose.Schema<IMusic>(
  {
    id: {
      type: String,
      required: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cover_large: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    play_url: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    duration: {
      type: Number,
      required: true,
    },
    cover_thumb: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    isDelete: {
      type: Boolean,
      required: false,
    },
    origin_video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    title: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("Music", musicSchema);
