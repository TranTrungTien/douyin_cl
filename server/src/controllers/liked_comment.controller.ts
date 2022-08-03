import { Request, Response } from "express";
import CommentModel from "../models/comment.model";
import LikedCommentModel from "../models/liked_comment.model";

function createLikedComment(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const video_id = req.body.video_id as string;
  const comment_id = req.body.comment_id as string;
  const likeComment = new LikedCommentModel({
    author_id: author_id,
    video_id: video_id,
    comment_id: comment_id,
  });
  likeComment.save((err) => {
    if (err) res.status(500).send({ message: "Error like video", error: err });
    else {
      CommentModel.findOneAndUpdate(
        {
          video_id: video_id,
          _id: comment_id,
        },
        {
          $inc: {
            like_count: 1,
          },
        },
        null,
        (err, doc) => {
          if (err)
            res
              .status(500)
              .send({ message: "Error update liked counter", err: err });
          else
            res
              .status(200)
              .send({ message: "Updated liked counter", doc: doc });
        }
      );
    }
  });
}

function getAllLikedCommentOfVideo(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const video_id = req.query.video_id as string;
  LikedCommentModel.find(
    {
      author_id: author_id,
      video_id: video_id,
      reply_comment_id: {
        $exists: false,
      },
    },
    null,
    null
  )
    .populate("video_id")
    .populate("comment_id")
    .exec((err, list) => {
      if (err)
        return res.status(500).send({ err, message: "Something went wrong" });
      else {
        if (list.length <= 0)
          return res
            .status(404)
            .send({ err, message: "No liked comments found" });
        else
          return res
            .status(200)
            .send({ message: "Found liked comments", list });
      }
    });
}

function getAllLikedCommentInOtherComment(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const video_id = req.query.video_id as string;
  const reply_comment_id = req.query.reply_comment_id as string;
  LikedCommentModel.find(
    {
      author_id: author_id,
      video_id: video_id,
      reply_comment_id: reply_comment_id,
    },
    null,
    null
  )
    .populate("video_id")
    .populate("comment_id")
    .exec((err, list) => {
      if (err)
        return res.status(500).send({ err, message: "Something went wrong" });
      else {
        if (list.length <= 0)
          return res
            .status(404)
            .send({ err, message: "No liked comments found" });
        else
          return res
            .status(200)
            .send({ message: "Found liked comments", list });
      }
    });
}

function deleteLikedComment(req: Request, res: Response) {
  const video_id = req.query.video_id as string;
  const comment_id = req.query.comment_id as string;
  const author_id = req.body._id as string;
  LikedCommentModel.findOneAndDelete(
    {
      author_id: author_id,
      video_id: video_id,
      comment_id: comment_id,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error unliked", err });
      else {
        if (!doc) return res.status(404).send({ message: "Not Found", err });
        else {
          CommentModel.findOneAndUpdate(
            {
              video_id: video_id,
              _id: comment_id,
            },
            {
              $inc: {
                like_count: -1,
              },
            },
            null,
            (err, doc) => {
              if (err)
                res.status(500).send({
                  message: "Error update delete like counter",
                  err: err,
                });
              else
                res
                  .status(200)
                  .send({ message: "Updated delete like counter", doc: doc });
            }
          );
        }
      }
    }
  );
}

export default {
  createLikedComment,
  getAllLikedCommentOfVideo,
  getAllLikedCommentInOtherComment,
  deleteLikedComment,
};
