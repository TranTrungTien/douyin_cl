import { Request, Response } from "express";
import commentModel from "../models/comment.model";

const createComment = (req: Request, res: Response) => {
  const video_id = req.body.video_id as string;
  const author_id = req.body._id as string;
  const text = req.body.text as string;
  const reply_comment_id = req.body.reply_comment_id as string;
  let cmt = null;
  if (reply_comment_id) {
    cmt = {
      author_id: author_id,
      text: text,
      reply_comment_id: reply_comment_id,
      video_id: video_id,
    };
  } else {
    cmt = {
      author_id: author_id,
      text: text,
      video_id: video_id,
    };
  }

  const comment = new commentModel(cmt);
  comment.save((err, doc) => {
    if (err)
      return res.status(500).send({ message: "Error saving comment", err });
    else res.status(200).send({ message: "Comment saved", doc });
  });
};
const deleteComment = (req: Request, res: Response) => {
  const comment_id = req.body.comment_id;
  commentModel.findByIdAndUpdate(
    comment_id,
    { delete_comment: true },
    null,
    (err, doc) => {
      if (err)
        return res.status(500).send({ message: "Error deleting comment", err });
      else {
        if (!doc) return res.status(404).send({ message: "Comment not found" });
        else
          return res
            .status(200)
            .send({ message: "Comment deleted Successfully", doc });
      }
    }
  );
};

const getCommentOfVideo = (req: Request, res: Response) => {
  const video_id = req.query.video_id as string;
  console.log({ video_id });
  commentModel
    .find({ video_id: video_id }, null, null)
    .populate("author_id")
    .populate("video_id")
    .exec((err, list) => {
      if (err)
        return res.status(500).send({ message: "Error getting video", err });
      else return res.status(200).send({ message: "Video found", list });
    });
};
export default {
  getCommentOfVideo,
  createComment,
  deleteComment,
};
