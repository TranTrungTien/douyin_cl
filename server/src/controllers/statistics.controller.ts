import { Request, Response } from "express";
import StatisticsModel from "../models/statistics.model";
import { v4 } from "uuid";
import mongoose from "mongoose";
const create = async (req: Request, res: Response) => {
  const videoId = req.body.video_id as string;
  if (!mongoose.isValidObjectId(videoId)) {
    return res.status(400).send({ message: "video id  is missing" });
  }
  try {
    const statisticsDoc = await new StatisticsModel({
      id: v4(),
      video_id: videoId,
    }).save();
    return res
      .status(200)
      .send({ message: "Saved Statistics Successfully", data: statisticsDoc });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};
const getStatisticsOfVideo = async (req: Request, res: Response) => {
  const videoId = req.query.video_id as string;
  if (!mongoose.isValidObjectId(videoId)) {
    return res.status(400).send({ message: "video id  is missing" });
  }
  try {
    const statisticsDoc = await StatisticsModel.findOne(
      { video_id: videoId },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res.status(200).send({
      message: "Successfully retrieved statistics",
      statistics: statisticsDoc,
    });
  } catch (error) {
    return res.status(500).send({ message: "Error getting statistics", error });
  }
};
const updateLikeCount = async (req: Request, res: Response) => {
  const videoId = req.query.video_id as string;
  if (!mongoose.isValidObjectId(videoId)) {
    return res.status(400).send({ message: "video id  is missing" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const staticsDoc = await StatisticsModel.findOneAndUpdate(
      { video_id: videoId },
      { $inc: { like_count: 1 } },
      { session }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Successfully updated video", data: staticsDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};
const updateCommentCount = async (req: Request, res: Response) => {
  const videoId = req.query.video_id as string;
  if (!mongoose.isValidObjectId(videoId)) {
    return res.status(400).send({ message: "video id  is missing" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const staticsDoc = await StatisticsModel.findOneAndUpdate(
      { video_id: videoId },
      { $inc: { comment_count: 1 } },
      { session }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Successfully updated video", data: staticsDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};
const updateShareCount = async (req: Request, res: Response) => {
  const videoId = req.query.video_id as string;
  if (!mongoose.isValidObjectId(videoId)) {
    return res.status(400).send({ message: "video id  is missing" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const staticsDoc = await StatisticsModel.findOneAndUpdate(
      { video_id: videoId },
      { $inc: { share_count: 1 } },
      { session }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Successfully updated video", data: staticsDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

export default {
  updateCommentCount,
  create,
  updateLikeCount,
  updateShareCount,
  getStatisticsOfVideo,
};
