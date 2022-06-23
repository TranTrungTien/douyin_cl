import mongoose from "mongoose";
import { IVideo } from "../interface/video.interface";

const videoSchema = new mongoose.Schema<IVideo>({
  video_id: {
    type: String,
    required: true,
  },
  video: {
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
    ref: "User",
    required: true,
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
    author: {
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
});
