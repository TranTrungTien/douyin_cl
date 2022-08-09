import { Request, Response } from "express";
import { v4 } from "uuid";
import FollowingModel from "../models/following.model";

function createFollowing(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const follow_id = req.body.follow_id as string;
  const follower = new FollowingModel({
    author_id: author_id,
    follow: follow_id,
  });
  follower.save((err, doc) => {
    if (err) res.status(500).send({ message: "Error saving following", err });
    else res.status(200).send({ message: "Successfully created", doc });
  });
}

function deleteFollowing(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const follow_id = req.query.follow_id as string;
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

function checkFollowing(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const follow_id = req.query.follow_id as string;
  FollowingModel.findOne(
    {
      author_id: author_id,
      follow: follow_id,
    },
    null,
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error check following", err });
      else {
        if (!doc)
          return res.status(404).send({ message: "Following Not Found", err });
        else res.status(200).send({ message: "Successfully", doc });
      }
    }
  );
}

function getAllFollowing(req: Request, res: Response) {
  const author_id = req.body._id as string;
  FollowingModel.find(
    {
      author_id: author_id,
    },
    null,
    null,
    (err, list) => {
      if (err) res.status(500).send({ message: "Error check following", err });
      else {
        if (list.length === 0)
          return res.status(404).send({ message: "Following Not Found", err });
        else res.status(200).send({ message: "Successfully", list });
      }
    }
  );
}

export default {
  getAllFollowing,
  checkFollowing,
  createFollowing,
  deleteFollowing,
};
