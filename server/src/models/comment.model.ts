import mongoose, { Schema } from "mongoose";
import { IComment } from "../interface/comment.inteface";

const commentSchema = new mongoose.Schema<IComment>(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    reply_comment_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    like_count: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "",
    },
    reply_count: {
      type: Number,
      default: 0,
    },
    delete_comment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export default mongoose.model("Comment", commentSchema);
