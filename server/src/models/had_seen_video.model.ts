import mongoose, { Schema } from "mongoose";
import { IHadSeen } from "../interface/had_seen";

const hadSeen = new mongoose.Schema<IHadSeen>({
  author_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  had_seen_videos: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

export default mongoose.model("IHadSeen", hadSeen);
