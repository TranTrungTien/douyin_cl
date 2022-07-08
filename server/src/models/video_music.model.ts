import mongoose, { Schema } from "mongoose";
import { IVideoMusic } from "../interface/video_music.inteface";

const videoMusicSchema = new mongoose.Schema<IVideoMusic>(
  {
    id: {
      type: String,
      required: true,
    },
    music_id: {
      type: Schema.Types.ObjectId,
      ref: "Music",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("VideoMusic", videoMusicSchema);
