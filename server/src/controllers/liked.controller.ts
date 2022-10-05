import { Request, Response } from "express";
import mongoose from "mongoose";
import LikedModel from "../models/liked.model";
import StatisticsModel from "../models/statistics.model";
import UserModel from "../models/user.model";

const createLiked = async (req: Request, res: Response) => {
  const author_id = req.body._id as string;
  const authorVideoId = req.body.author_video_id as string;
  const video_id = req.body.video_id as string;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const likeVideoDoc = await new LikedModel({
      author_id: author_id,
      video_id: video_id,
    }).save();
    await UserModel.findByIdAndUpdate(
      authorVideoId,
      {
        $inc: {
          total_favorited: 1,
        },
      },
      { session, new: true }
    ).exec();
    await StatisticsModel.findOneAndUpdate(
      { video_id: video_id },
      {
        $inc: {
          like_count: 1,
        },
      },
      { session, new: true }
    ).exec();
    await session.commitTransaction();
    res.status(200).send({
      message: "Successfully liked",
      data: likeVideoDoc,
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const deleteLiked = async (req: Request, res: Response) => {
  const video_id = req.query.video_id as string;
  const authorVideoId = req.query.author_video_id as string;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const likedDoc = await LikedModel.findOneAndDelete(
      {
        video_id: video_id,
      },
      { session }
    ).exec();
    await UserModel.findByIdAndUpdate(
      authorVideoId,
      {
        $inc: {
          total_favorited: -1,
        },
      },
      { session }
    ).exec();
    await StatisticsModel.findOneAndUpdate(
      { video_id: video_id },
      { $inc: { like_count: -1 } },
      { session }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Successfully  updated video", data: likedDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const checkLiked = async (req: Request, res: Response) => {
  const authorID = req.body._id as string;
  const videoID = req.query.video_id as string;
  try {
    const doc = await LikedModel.findOne(
      {
        author_id: authorID,
        video_id: videoID,
      },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res
      .status(200)
      .send({ message: "Found liked video ", like: doc ? true : false });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};
export default {
  checkLiked,
  createLiked,
  deleteLiked,
};
