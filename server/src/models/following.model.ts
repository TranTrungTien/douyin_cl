import mongoose, { Schema } from "mongoose";
import { IFollowing } from "../interface/following.inteface";

const followingSchema = new mongoose.Schema<IFollowing>(
  {
    id: {
      type: String,
      required: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    follow: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("Following", followingSchema);
