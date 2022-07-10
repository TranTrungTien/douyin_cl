import { Request, Response } from "express";
import { v4 } from "uuid";
import LikedModel from "../models/liked.model";

function createLiked(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  const likeVideo = new LikedModel({
    author_id: author_id,
    video_id: video_id,
  });
  likeVideo.save((err, doc) => {
    if (err) res.status(500).send({ message: "Error like video", error: err });
    else res.status(200).send({ message: "Successfully liked", doc });
  });
}

function deleteLiked(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  LikedModel.findOneAndDelete(
    {
      author_id: author_id,
      video_id: video_id,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error unliked", err });
      else {
        if (!doc) return res.status(404).send({ message: "Not Found", err });
        else res.status(200).send({ message: "Successfully Unliked" });
      }
    }
  );
}

export default {
  createLiked,
  deleteLiked,
};
