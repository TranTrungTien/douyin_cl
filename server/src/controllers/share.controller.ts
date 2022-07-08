import { Request, Response } from "express";
import { v4 } from "uuid";
import SharedModel from "../models/shared.model";

function createShared(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  const likeVideo = new SharedModel({
    id: v4(),
    author_id: author_id,
    video_id: video_id,
  });
  likeVideo.save((err, doc) => {
    if (err)
      res.status(500).send({ message: "Error shared video", error: err });
    else res.status(200).send({ message: "Successfully shared", doc });
  });
}

function deleteShared(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  SharedModel.findOneAndDelete(
    {
      author_id: author_id,
      video_id: video_id,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error deleting shared", err });
      else {
        if (!doc)
          return res
            .status(404)
            .send({ message: "Shared Video Not Found", err });
        else res.status(200).send({ message: "Successfully Deleted" });
      }
    }
  );
}

export default {
  createShared,
  deleteShared,
};
