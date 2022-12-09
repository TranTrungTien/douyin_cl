import { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import CommentModel from "../models/comment.model";
import StatisticsModel from "../models/statistics.model";

const createComment = async (req: Request, res: Response) => {
  const videoId = req.body.video_id as string;
  const authorId = req.body._id as string;
  const text = req.body.text as string;
  const replyCommentId = req.body.reply_comment_id as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(authorId)
  ) {
    return res.status(400).send({ message: "video id and author id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const comment = await new CommentModel({
      author_id: authorId,
      text: text,
      reply_comment_id: replyCommentId,
      video_id: videoId,
    }).save();
    if (mongoose.isValidObjectId(replyCommentId)) {
      await CommentModel.findOneAndUpdate(
        {
          video_id: videoId,
          _id: replyCommentId,
        },
        {
          $inc: {
            reply_count: 1,
          },
        },
        {
          session,
        }
      ).exec();
      await StatisticsModel.findOneAndUpdate(
        {
          video_id: videoId,
        },
        {
          $inc: {
            comment_count: 1,
          },
        },
        {
          session,
        }
      ).exec();
      await session.commitTransaction();
      return res.status(200).send({ message: "Comment saved", data: comment });
    } else {
      await StatisticsModel.findOneAndUpdate(
        {
          video_id: videoId,
        },
        {
          $inc: {
            comment_count: 1,
          },
        },
        {
          session,
        }
      ).exec();
      return res.status(200).send({ message: "Comment saved", data: comment });
    }
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};
const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.query.comment_id;
  const videoId = req.query.video_id;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(commentId)
  ) {
    return res
      .status(400)
      .send({ message: "video id and comment id id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const commentDoc = await CommentModel.findByIdAndUpdate(
      commentId,
      { delete_comment: true },
      {
        session,
      }
    ).exec();
    await StatisticsModel.findOneAndUpdate(
      {
        video_id: videoId,
      },
      {
        $inc: {
          comment_count: -1,
        },
      },
      {
        session,
      }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Comment deleted Successfully", data: commentDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const getCommentOfVideo = async (req: Request, res: Response) => {
  const videoId = req.query.video_id as string;
  if (!mongoose.isValidObjectId(videoId)) {
    return res.status(400).send({ message: "video id needed" });
  }
  try {
    const list = await CommentModel.find(
      { video_id: videoId, reply_comment_id: { $exists: false } },
      {
        updatedAt: 0,
        __v: 0,
      },
      null
    )
      .populate("author_id")
      .exec();
    return res.status(200).send({ message: "Comments found", list });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getReplyComments = async (req: Request, res: Response) => {
  const videoId = req.query.video_id as string;
  const replyCommentId = req.query.reply_comment_id as string;
  const cursor = req.query.cursor as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(replyCommentId)
  ) {
    return res
      .status(400)
      .send({ message: "video id and reply comment id needed" });
  }
  try {
    const list = await CommentModel.find(
      {
        reply_comment_id: replyCommentId,
        video_id: videoId,
      },
      {
        updatedAt: 0,
        __v: 0,
      },
      {
        skip: (Number(cursor) || 0) * 10,
        limit: 10,
      }
    )
      .populate("author_id")
      .populate("reply_comment_id")
      .exec();
    return res.status(200).send({ message: "Found comments", list });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

export default {
  getCommentOfVideo,
  getReplyComments,
  createComment,
  deleteComment,
};
