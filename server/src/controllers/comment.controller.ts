import { Request, Response } from "express";
import mongoose from "mongoose";
import CommentModel from "../models/comment.model";
import StatisticsModel from "../models/statistics.model";

const createComment = async (req: Request, res: Response) => {
  const video_id = req.body.video_id as string;
  const author_id = req.body._id as string;
  const text = req.body.text as string;
  const reply_comment_id = req.body.reply_comment_id as string;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const comment = await new CommentModel({
      author_id: author_id,
      text: text,
      reply_comment_id: reply_comment_id,
      video_id: video_id,
    }).save();
    if (reply_comment_id) {
      await CommentModel.findOneAndUpdate(
        {
          video_id: video_id,
          _id: reply_comment_id,
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
          video_id: video_id,
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
          video_id: video_id,
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
  const comment_id = req.query.comment_id;
  const videoId = req.query.video_id;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const commentDoc = await CommentModel.findByIdAndUpdate(
      comment_id,
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
  const video_id = req.query.video_id as string;
  try {
    const list = await CommentModel.find(
      { video_id: video_id, reply_comment_id: { $exists: false } },
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
  const video_id = req.query.video_id as string;
  const reply_comment_id = req.query.reply_comment_id as string;
  const cursor = req.query.cursor as string;
  try {
    const list = await CommentModel.find(
      {
        reply_comment_id: reply_comment_id,
        video_id: video_id,
      },
      {
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
