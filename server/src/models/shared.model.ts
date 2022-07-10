import mongoose, { Schema } from "mongoose";
import { IYourVideoShared } from "../interface/shared.interface";

const sharedSchema = new mongoose.Schema<IYourVideoShared>(
  {
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

export default mongoose.model("YourVideoShared", sharedSchema);
