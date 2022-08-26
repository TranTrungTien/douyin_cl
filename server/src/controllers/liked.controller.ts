import { Request, Response } from "express";
import LikedModel from "../models/liked.model";
import StatisticsModel from "../models/statistics.model";
import UserModel from "../models/user.model";

function createLiked(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const authorVideoId = req.body.author_video_id as string;
  const video_id = req.body.video_id as string;
  const likeVideo = new LikedModel({
    author_id: author_id,
    video_id: video_id,
  });
  likeVideo.save((err, doc) => {
    if (err) {
      res.status(500).send({ message: "Error like video", error: err });
    } else {
      UserModel.findByIdAndUpdate(
        authorVideoId,
        {
          $inc: {
            total_favorited: 1,
          },
        },
        null,
        (err, _) => {
          if (err) {
            res
              .status(500)
              .send({ message: "Error increase total favorited", error: err });
          } else {
            StatisticsModel.findOneAndUpdate(
              { video_id: video_id },
              {
                $inc: {
                  like_count: 1,
                },
              },
              null,
              (err, _) => {
                if (err) {
                  res.status(500).send({ message: "Error", err });
                } else {
                  res.status(200).send({ message: "Successfully liked", doc });
                }
              }
            );
          }
        }
      );
    }
  });
}

function deleteLiked(req: Request, res: Response) {
  const video_id = req.query.video_id as string;
  const authorVideoId = req.query.author_video_id as string;
  LikedModel.findOneAndDelete(
    {
      video_id: video_id,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error unliked", err });
      else {
        if (!doc) return res.status(404).send({ message: "Not Found", err });
        else {
          UserModel.findByIdAndUpdate(
            authorVideoId,
            {
              $inc: {
                total_favorited: -1,
              },
            },
            null,
            (err, _) => {
              if (err) {
                res.status(500).send({
                  message: "Error decrease total favorited",
                  error: err,
                });
              } else {
                StatisticsModel.findOneAndUpdate(
                  { video_id: video_id },
                  { $inc: { like_count: -1 } },
                  null,
                  (err, doc) => {
                    if (err) {
                      res.status(500).send({ message: "Error", error: err });
                    } else {
                      res
                        .status(200)
                        .send({ message: "Successfully  updated video", doc });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
}

function checkLiked(req: Request, res: Response) {
  const authorID = req.body._id as string;
  const videoID = req.query.video_id as string;
  LikedModel.findOne(
    {
      author_id: authorID,
      video_id: videoID,
    },
    { createdAt: 0, updatedAt: 0, __v: 0 },
    null,
    (err, doc) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Something went wrong", error: err });
      else if (!doc)
        return res
          .status(200)
          .send({ message: "Not Found liked video", like: false });
      else
        res
          .status(200)
          .send({ message: "Found liked video ", like: doc ? true : false });
    }
  );
}
export default {
  checkLiked,
  createLiked,
  deleteLiked,
};
