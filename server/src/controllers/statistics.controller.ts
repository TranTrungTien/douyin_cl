import { Request, Response } from "express";
import StatisticsModel from "../models/statistics.model";
import { v4 } from "uuid";
function create(req: Request, res: Response) {
  const video_id = req.body.video_id as string;
  const statistics = new StatisticsModel({
    id: v4(),
    video_id: video_id,
  });
  statistics.save((err, doc) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Error saving statistics", error: err });
    else res.status(200).send({ message: "Successfully", doc });
  });
}
function getStatisticsOfVideo(req: Request, res: Response) {
  const video_id = req.query.video_id as string;
  StatisticsModel.findOne(
    { video_id: video_id },
    { createdAt: 0, updatedAt: 0, __v: 0 },
    null,
    (err, doc) => {
      if (err)
        res
          .status(500)
          .send({ message: "Error getting statistics", error: err });
      else {
        if (!doc)
          return res.status(404).send({ message: "Not Found Statistics" });
        else
          res.status(200).send({
            message: "Successfully retrieved statistics",
            statistics: doc,
          });
      }
    }
  );
}
function updateLikeCount(req: Request, res: Response) {
  const video_id = req.body.video_id as string;

  StatisticsModel.findOneAndUpdate(
    { video_id: video_id },
    { $inc: { like_count: 1 } },
    null,
    (err, doc) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error updating video", error: err });
      else {
        if (!doc) return res.status(404).send({ message: "Error Not Found" });
        else
          return res
            .status(200)
            .send({ message: "Successfully updated video", doc });
      }
    }
  );
}
function updateCommentCount(req: Request, res: Response) {
  const video_id = req.body.video_id as string;

  StatisticsModel.findOneAndUpdate(
    { video_id: video_id },
    { $inc: { comment_count: 1 } },
    null,
    (err, doc) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error updating video", error: err });
      else {
        if (!doc) return res.status(404).send({ message: "Error Not Found" });
        else
          return res
            .status(200)
            .send({ message: "Successfully updated video", doc });
      }
    }
  );
}
function updateShareCount(req: Request, res: Response) {
  const video_id = req.body.video_id as string;

  StatisticsModel.findOneAndUpdate(
    { video_id: video_id },
    { $inc: { share_count: 1 } },
    null,
    (err, doc) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error updating video", error: err });
      else {
        if (!doc) return res.status(404).send({ message: "Error Not Found" });
        else
          return res
            .status(200)
            .send({ message: "Successfully updated video", doc });
      }
    }
  );
}

export default {
  updateCommentCount,
  create,
  updateLikeCount,
  updateShareCount,
  getStatisticsOfVideo,
};
