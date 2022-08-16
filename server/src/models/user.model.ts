import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar_larger: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    avatar_thumb: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    cover_url: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    follower_count: {
      type: Number,
      default: 0,
    },
    follower_request_status: {
      type: Number,
      default: 0,
    },
    following_count: {
      type: Number,
      default: 0,
    },
    ip_location: {
      type: String,
      default: "",
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    is_effect_artist: {
      type: Boolean,
      default: false,
    },
    is_gov_media_vip: {
      type: Boolean,
      default: false,
    },
    nickname: {
      type: String,
      required: true,
    },
    original_musician: {
      music_count: {
        type: Number,
        default: 0,
      },
    },
    share_info: {
      share_desc: {
        type: String,
        default: "",
      },
      share_image_url: {
        url_list: {
          type: [String],
          default: [],
        },
      },
      share_url: {
        type: String,
        default: "",
      },
    },
    show_favorite_list: {
      type: Boolean,
      default: false,
    },
    signature: {
      type: String,
      default: "",
    },
    signature_language: {
      type: String,
      default: "",
    },
    total_favorited: {
      type: Number,
      default: 0,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
