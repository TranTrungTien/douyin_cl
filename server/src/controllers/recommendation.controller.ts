import { fork } from "child_process";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import { RecommendationUtils } from "../utils/recommendation";
import VideoModel from "../models/video.model";
import { IVideo } from "../interface/video.interface";
import { metaPath } from "../const/path";
function getRecommendationDef(req: Request, res: Response) {
  VideoModel.find({}, null, null)
    .populate("author")
    .exec((err, list) => {
      if (err) res.status(500).send({ message: "Error", err });
      else {
        if (!list) return res.status(404).send({ message: "List not found" });
        else res.status(200).send({ message: "Successfully", list });
      }
    });
}

function getRecommendationFromVideo(req: Request, res: Response) {
  const videoId = req.query.videoId as string;
  const data = JSON.parse(
    fs.readFileSync(metaPath + "/destination_metadata.json", "utf8")
  ) as IVideo[];
  let id = 0;
  data.forEach((value, idx) => {
    if (value.video_id === videoId) id = idx;
  });
  const indexes = RecommendationUtils.getRecommendedIndexes(id);

  const list = indexes?.map((value) => {
    return data[value];
  });
  list
    ? res.status(200).send({ message: "Successfully", list })
    : res.status(500).send({ message: "Error" });
}

const RecommendationController = {
  getRecommendationDef,
  getRecommendationFromVideo,
};

export default RecommendationController;
