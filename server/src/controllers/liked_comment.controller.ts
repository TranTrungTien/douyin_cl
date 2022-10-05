import { Request, Response } from "express";
import mongoose from "mongoose";
import CommentModel from "../models/comment.model";
import LikedCommentModel from "../models/liked_comment.model";

const createLikedComment = async (req: Request, res: Response) => {
  const author_id = req.body._id as string;
  const video_id = req.body.video_id as string;
  const comment_id = req.body.comment_id as string;
  const reply_comment_id = req.body.reply_comment_id as string;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const likeComment = await new LikedCommentModel({
      reply_comment_id: reply_comment_id,
      author_id: author_id,
      video_id: video_id,
      comment_id: comment_id,
    }).save();
    await CommentModel.findOneAndUpdate(
      {
        video_id: video_id,
        _id: comment_id,
      },
      {
        $inc: {
          like_count: 1,
        },
      },
      { session }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Updated liked counter", data: likeComment });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const getAllLikedCommentOfVideo = async (req: Request, res: Response) => {
  const author_id = req.body._id as string;
  const video_id = req.query.video_id as string;
  try {
    const list = await LikedCommentModel.find(
      {
        author_id: author_id,
        video_id: video_id,
        reply_comment_id: {
          $exists: false,
        },
      },
      { createdAt: 0, updatedAt: 0, __v: 0 },
      null
    )
      .populate("video_id")
      .populate("comment_id")
      .exec();
    return res.status(200).send({ message: "Found liked comments", list });
  } catch (error) {
    res.status(500).send({ error, message: "Something went wrong" });
  }
};

const getAllLikedCommentInOtherComment = async (
  req: Request,
  res: Response
) => {
  const author_id = req.body._id as string;
  const video_id = req.query.video_id as string;
  const reply_comment_id = req.query.reply_comment_id as string;
  try {
    const list = await LikedCommentModel.find(
      {
        author_id: author_id,
        video_id: video_id,
        reply_comment_id: reply_comment_id,
      },
      { createdAt: 0, updatedAt: 0, __v: 0 },
      null
    )
      .populate("video_id")
      .populate("comment_id")
      .exec();
    return res.status(200).send({ message: "Found liked comments", list });
  } catch (error) {
    return res.status(500).send({ error, message: "Something went wrong" });
  }
};

const deleteLikedComment = async (req: Request, res: Response) => {
  const video_id = req.query.video_id as string;
  const comment_id = req.query.comment_id as string;
  const author_id = req.body._id as string;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const likedCommentDoc = await LikedCommentModel.findOneAndDelete(
      {
        author_id: author_id,
        video_id: video_id,
        comment_id: comment_id,
      },
      { session }
    ).exec();
    await CommentModel.findOneAndUpdate(
      {
        video_id: video_id,
        _id: comment_id,
      },
      {
        $inc: {
          like_count: -1,
        },
      },
      { session }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Updated delete like counter", data: likedCommentDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

export default {
  createLikedComment,
  getAllLikedCommentOfVideo,
  getAllLikedCommentInOtherComment,
  deleteLikedComment,
};
