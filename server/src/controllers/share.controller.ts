import { Request, Response } from "express";
import mongoose from "mongoose";
import { v4 } from "uuid";
import SharedModel from "../models/shared.model";

const createShared = async (req: Request, res: Response) => {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  try {
    const sharedDoc = await new SharedModel({
      id: v4(),
      author_id: author_id,
      video_id: video_id,
    }).save();
    res.status(200).send({ message: "Successfully shared", data: sharedDoc });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error });
  }
};

const deleteShared = async (req: Request, res: Response) => {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await SharedModel.findOneAndDelete({
      author_id: author_id,
      video_id: video_id,
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
