import { Request, Response } from "express";
import { v4 } from "uuid";
import OwnVideo from "../models/own_video.model";

function createYourVideo(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const video_id = req.body.video_id as string;
  const own = new OwnVideo({
    id: v4(),
    author_id: author_id,
    video_id: video_id,
  });
  own.save((err, doc) => {
    if (err) res.status(500).send({ message: "Error saving own video", err });
    else res.status(200).send({ message: "Successfully created", doc });
  });
}

function deleteYourVideo(req: Request, res: Response) {
  const author_id = req.body.author_id as string;
  const follow_id = req.body.follow_id as string;
  OwnVideo.findOneAndUpdate(
    {
      author_id: author_id,
      follow: follow_id,
    },
    {
      isDelete: true,
    },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error deleting video", err });
      else {
        if (!doc)
          return res.status(404).send({ message: "Your Video Not Found", err });
        else res.status(200).send({ message: "Successfully Deleted" });
      }
    }
  );
}

export default {
  createYourVideo,
  deleteYourVideo,
};
