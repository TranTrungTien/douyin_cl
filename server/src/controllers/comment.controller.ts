import { Request, Response } from "express";
import CommentModel from "../models/comment.model";
import StatisticsModel from "../models/statistics.model";

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

  const comment = new CommentModel(cmt);
  comment.save((err, doc) => {
    if (err)
      return res.status(500).send({ message: "Error saving comment", err });
    else {
      if (reply_comment_id) {
        CommentModel.findOneAndUpdate(
          {
            video_id: video_id,
            _id: reply_comment_id,
          },
          {
            $inc: {
              reply_count: 1,
            },
          },
          null,
          (err, _) => {
            if (err)
              return res
                .status(500)
                .send({ message: "Error update reply count for comment", err });
            else {
              StatisticsModel.findOneAndUpdate(
                {
                  video_id: video_id,
                },
                {
                  $inc: {
                    comment_count: 1,
                  },
                },
                null,
                (err, _) => {
                  if (err)
                    return res.status(500).send({
                      message: "Error updating comment count for video",
                      err,
                    });
                  else res.status(200).send({ message: "Comment saved", doc });
                }
              );
            }
          }
        );
      } else {
        StatisticsModel.findOneAndUpdate(
          {
            video_id: video_id,
          },
          {
            $inc: {
              comment_count: 1,
            },
          },
          null,
          (err, _) => {
            if (err)
              return res.status(500).send({
                message: "Error updating comment count for video",
                err,
              });
            else res.status(200).send({ message: "Comment saved", doc });
          }
        );
      }
    }
  });
};
const deleteComment = (req: Request, res: Response) => {
  const comment_id = req.query.comment_id;
  const videoId = req.query.video_id;
  CommentModel.findByIdAndUpdate(
    comment_id,
    { delete_comment: true },
    null,
    (err, doc) => {
      if (err)
        return res.status(500).send({ message: "Error deleting comment", err });
      else {
        if (!doc) return res.status(404).send({ message: "Comment not found" });
        else {
          StatisticsModel.findOneAndUpdate(
            {
              video_id: videoId,
            },
            {
              $inc: {
                comment_count: -1,
              },
            },
            null,
            (err, _) => {
              if (err) return res.status(500).send({ message: "Error", err });
              else
                return res
                  .status(200)
                  .send({ message: "Comment deleted Successfully", doc });
            }
          );
        }
      }
    }
  );
};

const getCommentOfVideo = (req: Request, res: Response) => {
  const video_id = req.query.video_id as string;
  CommentModel.find(
    { video_id: video_id, reply_comment_id: { $exists: false } },
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
    null
  )
    .populate("author_id")
    .exec((err, list) => {
      if (err)
        return res.status(500).send({ message: "Error getting video", err });
      else if (list.length <= 0) {
        return res.status(404).send({ message: "Comments not found", list });
      } else {
        return res.status(200).send({ message: "Comments found", list });
      }
    });
};

const getReplyComments = (req: Request, res: Response) => {
  const video_id = req.query.video_id as string;
  const reply_comment_id = req.query.reply_comment_id as string;
  const cursor = req.query.cursor as string;
  CommentModel.find(
    {
      reply_comment_id: reply_comment_id,
      video_id: video_id,
    },
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
    {
      skip: Number(cursor) * 10,
      limit: 10,
    }
  )
    .populate("author_id")
    .populate("reply_comment_id")
    .exec((err, list) => {
      if (err)
        return res.status(500).send({ err, message: "Something went wrong" });
      else {
        if (list.length <= 0)
          return res.status(404).send({ err, message: "No comment found" });
        else return res.status(200).send({ message: "Found comments", list });
      }
    });
};

export default {
  getCommentOfVideo,
  getReplyComments,
  createComment,
  deleteComment,
};
