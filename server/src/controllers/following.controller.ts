import { Request, Response } from "express";
import { v4 } from "uuid";
import FollowingModel from "../models/following.model";

function createFollowing(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const followed_by = req.body.followed_by as string;
  const follower = new FollowingModel({
    id: v4(),
    author_id: author_id,
    followed_by: followed_by,
  });
  follower.save((err, doc) => {
    if (err) res.status(500).send({ message: "Error saving following", err });
    else res.status(200).send({ message: "Successfully created", doc });
  });
}

function deleteFollowing(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const follow_id = req.body.follow_id as string;
  FollowingModel.findOneAndDelete(
    {
      author_id: author_id,
      follow: follow_id,
    },

    null,
    (err, doc) => {
      if (err)
        res.status(500).send({ message: "Error deleting following", err });
      else {
        if (!doc)
          return res.status(404).send({ message: "Following Not Found", err });
        else res.status(200).send({ message: "Successfully Deleted" });
      }
    }
  );
}

export default {
  createFollowing,
  deleteFollowing,
};
