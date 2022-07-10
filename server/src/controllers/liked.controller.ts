import { Request, Response } from "express";
import LikedModel from "../models/liked.model";
import StatisticsModel from "../models/statistics.model";

function createLiked(req: Request, res: Response) {
  const author_id = req.body._id as string;
  const video_id = req.body.video_id as string;
  const likeVideo = new LikedModel({
    author_id: author_id,
    video_id: video_id,
  });
  likeVideo.save((err) => {
    if (err) res.status(500).send({ message: "Error like video", error: err });
    else {
      StatisticsModel.findOneAndUpdate(
        { video_id: video_id },
        {
          $inc: {
            like_count: 1,
          },
        },
        null,
        (err, statisticsDoc) => {
          if (err) res.status(500).send(err);
          else
            res
              .status(200)
              .send({ message: "Successfully liked", statisticsDoc });
        }
      );
    }
  });
}

function deleteLiked(req: Request, res: Response) {
  const video_id = req.query.video_id as string;
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
          StatisticsModel.findOneAndUpdate(
            { video_id: video_id },
            { $inc: { like_count: -1 } },
            null,
            (err, doc) => {
              if (err) res.status(500).send({ message: "Error", error: err });
              else
                res
                  .status(200)
                  .send({ message: "Successfully  updated video", doc });
            }
          );
        }
      }
    }
  );
}

export default {
  createLiked,
  deleteLiked,
};
