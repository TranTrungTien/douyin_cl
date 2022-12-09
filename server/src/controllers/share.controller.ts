import { Request, Response } from "express";
import mongoose from "mongoose";
import { v4 } from "uuid";
import SharedModel from "../models/shared.model";

const createShared = async (req: Request, res: Response) => {
  const authorId = req.body._id as string;
  const videoId = req.query.video_id as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(authorId)
  ) {
    return res.status(400).send({ message: "video id and author id needed" });
  }
  try {
    const sharedDoc = await new SharedModel({
      id: v4(),
      author_id: authorId,
      video_id: videoId,
    }).save();
    res.status(200).send({ message: "Successfully shared", data: sharedDoc });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error });
  }
};

const deleteShared = async (req: Request, res: Response) => {
  const authorId = req.body.author_id as string;
  const videoId = req.body.video_id as string;
  if (
    !mongoose.isValidObjectId(videoId) ||
    !mongoose.isValidObjectId(authorId)
  ) {
    return res.status(400).send({ message: "video id and author id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await SharedModel.findOneAndDelete({
      author_id: authorId,
      video_id: videoId,
    }).exec();
    await session.commitTransaction();
    res.status(200).send({ message: "Successfully Deleted" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

export default {
  createShared,
  deleteShared,
};
