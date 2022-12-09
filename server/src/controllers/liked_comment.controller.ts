import { Request, Response } from "express";
import mongoose from "mongoose";
import CommentModel from "../models/comment.model";
import LikedCommentModel from "../models/liked_comment.model";

const createLikedComment = async (req: Request, res: Response) => {
  const commentId = req.body.comment_id as string;
  const videoId = req.body.video_id as string;
  const authorId = req.body._id as string;
  const replyCommentId = req.body.reply_comment_id as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(commentId)
  ) {
    return res
      .status(400)
      .send({ message: "video id and author id and comment id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const likeComment = await new LikedCommentModel({
      reply_comment_id: replyCommentId,
      author_id: authorId,
      video_id: videoId,
      comment_id: commentId,
    }).save();
    await CommentModel.findOneAndUpdate(
      {
        video_id: videoId,
        _id: commentId,
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
  const videoId = req.query.video_id as string;
  const authorId = req.body._id as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(authorId)
  ) {
    return res.status(400).send({ message: "video id and author id  needed" });
  }
  try {
    const list = await LikedCommentModel.find(
      {
        author_id: authorId,
        video_id: videoId,
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
  const videoId = req.query.video_id as string;
  const replyCommentId = req.query.reply_comment_id as string;
  const authorId = req.body._id as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(replyCommentId)
  ) {
    return res
      .status(400)
      .send({ message: "video id and author id and comment id needed" });
  }
  try {
    const list = await LikedCommentModel.find(
      {
        author_id: authorId,
        video_id: videoId,
        reply_comment_id: replyCommentId,
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
  const commentId = req.query.comment_id as string;
  const videoId = req.query.video_id as string;
  const authorId = req.body._id as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(commentId)
  ) {
    return res
      .status(400)
      .send({ message: "video id and author id and comment id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const likedCommentDoc = await LikedCommentModel.findOneAndDelete(
      {
        author_id: authorId,
        video_id: videoId,
        comment_id: commentId,
      },
      { session }
    ).exec();
    await CommentModel.findOneAndUpdate(
      {
        video_id: videoId,
        _id: commentId,
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
