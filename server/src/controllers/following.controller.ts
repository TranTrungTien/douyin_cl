import { Request, Response } from "express";
import mongoose from "mongoose";
import { v4 } from "uuid";
import FollowingModel from "../models/following.model";
import UserModel from "../models/user.model";

const createFollowing = async (req: Request, res: Response) => {
  const authorId = req.body._id as string;
  const followId = req.body.follow_id as string;
  if (
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(followId)
  ) {
    return res.status(400).send({ message: "author id and follow id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const followerDoc = await new FollowingModel({
      author_id: authorId,
      follow: followId,
    }).save();
    await UserModel.findByIdAndUpdate(
      authorId,
      {
        $inc: {
          following_count: 1,
        },
      },
      { session }
    ).exec();
    await UserModel.findByIdAndUpdate(
      followId,
      {
        $inc: {
          follower_count: 1,
        },
      },
      { session }
    ).exec();
    await session.commitTransaction();
    return res.status(200).send({
      message: "Successfully created following",
      data: followerDoc,
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const deleteFollowing = async (req: Request, res: Response) => {
  const authorId = req.body._id as string;
  const followId = req.query.follow_id as string;
  if (
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(followId)
  ) {
    return res.status(400).send({ message: "author id and follow id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const followingDoc = await FollowingModel.findOneAndDelete(
      {
        author_id: authorId,
        follow: followId,
      },
      { session }
    );
    await UserModel.findByIdAndUpdate(
      authorId,
      {
        $inc: {
          following_count: -1,
        },
      },
      { session }
    ).exec();
    await UserModel.findByIdAndUpdate(
      followId,
      {
        $inc: {
          follower_count: -1,
        },
      },
      { session }
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Successfully", data: followingDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const checkFollowing = (req: Request, res: Response) => {
  const authorId = req.body._id as string;
  const followId = req.query.follow_id as string;
  if (
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(followId)
  ) {
    return res.status(400).send({ message: "author id and follow id needed" });
  }
  try {
    const data = FollowingModel.findOne(
      {
        author_id: authorId,
        follow: followId,
      },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res.status(200).send({ message: "Successfully", data });
  } catch (error) {
    return res.status(500).send({ message: "Error check following", error });
  }
};

const getAllFollowing = async (req: Request, res: Response) => {
  const authorId = req.body._id as string;
  if (!mongoose.isValidObjectId(authorId)) {
    return res.status(400).send({ message: "author id needed" });
  }
  try {
    const list = await FollowingModel.find(
      {
        author_id: authorId,
      },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res.status(200).send({ message: "Successfully", list });
  } catch (error) {
    return res.status(500).send({ message: "Error check following", error });
  }
};

const block = async (req: Request, res: Response) => {
  const follower = req.body.follower as string;
  const authorId = req.body.author_id as string;
  if (
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(follower)
  ) {
    return res
      .status(400)
      .send({ message: "author id and follower id needed" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await FollowingModel.findOneAndUpdate(
      {
        author_id: follower,
        follow: authorId,
      },
      {
        isBlockedByAuthor: true,
      },
      { session }
    );
    await UserModel.findByIdAndUpdate(
      authorId,
      {
        $inc: {
          follower_count: -1,
        },
      },
      { session }
    ).exec();
    await session.commitTransaction();
    return res.status(200).send({ message: "Successfully Blocked" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

export default {
  block,
  getAllFollowing,
  checkFollowing,
  createFollowing,
  deleteFollowing,
};
