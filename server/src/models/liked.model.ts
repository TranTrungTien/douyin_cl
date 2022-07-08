import mongoose, { Schema } from "mongoose";
import { IYourVideoLiked } from "../interface/liked.interface";

const likedSchema = new mongoose.Schema<IYourVideoLiked>(
  {
    id: {
      type: String,
      required: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("YourVideoLiked", likedSchema);
