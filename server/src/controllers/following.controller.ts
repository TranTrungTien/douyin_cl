import { Request, Response } from "express";
import mongoose from "mongoose";
import { v4 } from "uuid";
import FollowingModel from "../models/following.model";
import UserModel from "../models/user.model";

const createFollowing = async (req: Request, res: Response) => {
  const author_id = req.body._id as string;
  const follow_id = req.body.follow_id as string;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const followerDoc = await new FollowingModel({
      author_id: author_id,
      follow: follow_id,
    }).save();
    await UserModel.findByIdAndUpdate(
      author_id,
      {
        $inc: {
          following_count: 1,
        },
      },
      { session }
    ).exec();
    await UserModel.findByIdAndUpdate(
      follow_id,
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
  const author_id = req.body._id as string;
  const follow_id = req.query.follow_id as string;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const followingDoc = await FollowingModel.findOneAndDelete(
      {
        author_id: author_id,
        follow: follow_id,
      },
      { session }
    );
    await UserModel.findByIdAndUpdate(
      author_id,
      {
        $inc: {
          following_count: -1,
        },
      },
      { session }
    ).exec();
    await UserModel.findByIdAndUpdate(
      follow_id,
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
  const author_id = req.body._id as string;
  const follow_id = req.query.follow_id as string;
  try {
    const data = FollowingModel.findOne(
      {
        author_id: author_id,
        follow: follow_id,
      },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res.status(200).send({ message: "Successfully", data });
  } catch (error) {
    return res.status(500).send({ message: "Error check following", error });
  }
};

const getAllFollowing = async (req: Request, res: Response) => {
  const author_id = req.body._id as string;
  try {
    const list = await FollowingModel.find(
      {
        author_id: author_id,
      },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res.status(200).send({ message: "Successfully", list });
  } catch (error) {
    return res.status(500).send({ message: "Error check following", error });
  }
};

const block = async (req: Request, res: Response) => {
  const follower = req.body.author_id as string;
  const author_id = req.body.follower_id as string;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await FollowingModel.findOneAndUpdate(
      {
        author_id: follower,
        follow: author_id,
      },
      {
        isBlockedByAuthor: true,
      },
      { session }
    );
    await UserModel.findByIdAndUpdate(
      author_id,
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
