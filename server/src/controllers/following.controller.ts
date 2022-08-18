import { Request, Response } from "express";
import { v4 } from "uuid";
import FollowingModel from "../models/following.model";
import UserModel from "../models/user.model";

function createFollowing(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const follow_id = req.body.follow_id as string;
  const follower = new FollowingModel({
    author_id: author_id,
    follow: follow_id,
  });
  follower.save((err, doc) => {
    if (err) res.status(500).send({ message: "Error saving following", err });
    else {
      UserModel.findByIdAndUpdate(
        author_id,
        {
          $inc: {
            following_count: 1,
          },
        },
        null,
        (err, _) => {
          if (err)
            res.status(500).send({ message: "Error decrease following", err });
          else {
            UserModel.findByIdAndUpdate(
              follow_id,
              {
                $inc: {
                  follower_count: 1,
                },
              },
              null,
              (err, _) => {
                if (err)
                  res
                    .status(500)
                    .send({ message: "Error decrease follower", err });
                else
                  res
                    .status(200)
                    .send({ message: "Successfully created following", doc });
              }
            );
          }
        }
      );
    }
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
        else {
          UserModel.findByIdAndUpdate(
            author_id,
            {
              $inc: {
                following_count: -1,
              },
            },
            null,
            (err, _) => {
              if (err)
                res
                  .status(500)
                  .send({ message: "Error decrease following", err });
              else
                UserModel.findByIdAndUpdate(
                  follow_id,
                  {
                    $inc: {
                      follower_count: -1,
                    },
                  },
                  null,
                  (err, _) => {
                    if (err)
                      res
                        .status(500)
                        .send({ message: "Error decrease follower", err });
                    else
                      res.status(200).send({
                        message: "Successfully Deleted following",
                        doc,
                      });
                  }
                );
            }
          );
        }
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

function block(req: Request, res: Response) {
  const follower = req.body.author_id as string;
  const author_id = req.body.follower_id as string;
  FollowingModel.findOneAndUpdate(
    {
      author_id: follower,
      follow: author_id,
    },
    {
      isBlockedByAuthor: true,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error block follower", err });
      else {
        if (!doc)
          return res.status(404).send({ message: "Follower Not Found", err });
        else {
          UserModel.findByIdAndUpdate(
            author_id,
            {
              $inc: {
                follower_count: -1,
              },
            },
            null,
            (err, _) => {
              if (err)
                res
                  .status(500)
                  .send({ message: "Error blocked follower", err });
              else res.status(200).send({ message: "Successfully Blocked" });
            }
          );
        }
      }
    }
  );
}

export default {
  block,
  getAllFollowing,
  checkFollowing,
  createFollowing,
  deleteFollowing,
};
