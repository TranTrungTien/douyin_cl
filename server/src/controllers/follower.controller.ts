import { Request, Response } from "express";
import { v4 } from "uuid";
import FollowerModel from "../models/follower.model";

function createFollower(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const followed_by = req.body.followed_by as string;
  const follower = new FollowerModel({
    id: v4(),
    author_id: author_id,
    followed_by: followed_by,
  });
  follower.save((err, doc) => {
    if (err) res.status(500).send({ message: "Error saving follower", err });
    else res.status(200).send({ message: "Successfully created", doc });
  });
}

function blockFollower(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const follower_id = req.body.follower_id as string;
  FollowerModel.findOneAndUpdate(
    {
      author_id: author_id,
      followed_by: follower_id,
    },
    {
      blocked: true,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error block follower", err });
      else {
        if (!doc)
          return res.status(404).send({ message: "Follower Not Found", err });
        else res.status(200).send({ message: "Successfully Blocked" });
      }
    }
  );
}

export default {
  createFollower,
  blockFollower,
};
