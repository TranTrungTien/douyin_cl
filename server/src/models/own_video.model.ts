import mongoose, { Schema } from "mongoose";
import { IYourOwnVideo } from "../interface/own_video.inteface";

const ownVideoSchema = new mongoose.Schema<IYourOwnVideo>(
  {
    isDelete: {
      type: Boolean,
      default: false,
    },
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

export default mongoose.model("YourOwnVideo", ownVideoSchema);
