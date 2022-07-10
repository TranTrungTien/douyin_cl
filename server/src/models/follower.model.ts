import mongoose, { Schema } from "mongoose";
import { IFollower } from "../interface/follower.interface";

const followerSchema = new mongoose.Schema<IFollower>(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    followed_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("Follower", followerSchema);
