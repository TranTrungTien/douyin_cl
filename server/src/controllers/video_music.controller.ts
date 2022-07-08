import { Request, Response } from "express";
import { v4 } from "uuid";
import LikedModel from "../models/liked.model";

function createVideoMusic(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  const likeVideo = new LikedModel({
    id: v4(),
    author_id: author_id,
    video_id: video_id,
  });
  likeVideo.save((err, doc) => {
    if (err)
      res.status(500).send({ message: "Error save video music", error: err });
    else
      res.status(200).send({ message: "Successfully save video music", doc });
  });
}

function deleteVideoMusic(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  LikedModel.findOneAndDelete(
    {
      author_id: author_id,
      video_id: video_id,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error delete", err });
      else {
        if (!doc) return res.status(404).send({ message: "Not Found", err });
        else res.status(200).send({ message: "Successfully deleteVideoMusic" });
      }
    }
  );
}

export default {
  createVideoMusic,
  deleteVideoMusic,
};
