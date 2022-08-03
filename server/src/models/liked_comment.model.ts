import mongoose, { Schema } from "mongoose";
import { ICommentLiked } from "../interface/liked.interface";

const likedCommentSchema = new mongoose.Schema<ICommentLiked>(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    comment_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    reply_comment_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("Liked_Comment", likedCommentSchema);
