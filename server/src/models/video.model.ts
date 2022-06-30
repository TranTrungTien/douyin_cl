import mongoose from "mongoose";
import { IVideo } from "../interface/video.interface";

const videoSchema = new mongoose.Schema<IVideo>(
  {
    video_id: {
      type: String,
      required: true,
    },
    video: {
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
    },
    author: {
      uid: {
        type: String,
        required: true,
      },
    },
    desc: {
      type: String,
      default: "",
    },
    statistics: {
      comment_count: {
        type: Number,
        default: 0,
      },
      like_count: {
        type: Number,
        default: 0,
      },
      share_count: {
        type: Number,
        default: 0,
      },
    },
    music: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      author_id: {
        type: String,
        required: true,
      },
      cover_large: {
        url_list: {
          type: [String],
          default: [],
        },
      },
      cover_thumb: {
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
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);
