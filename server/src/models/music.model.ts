import * as mongoose from "mongoose";
import { Schema } from "mongoose";
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
    play_addr: {
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
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);
const MusicModel = mongoose.model("Music", musicSchema);
export default MusicModel;
