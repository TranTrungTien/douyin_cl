import { Request, Response } from "express";
import * as fs from "fs";
import { metaPath } from "../const/path";
import { IVideo } from "../interface/video.interface";
import VideoModel from "../models/video.model";
import { RecommendationUtils } from "../utils/recommendation";

///just for development

const shuffleArray = (array: IVideo[]) => {
  const listCopy = [...array];
  for (let i = listCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [listCopy[i], listCopy[j]] = [listCopy[j], listCopy[i]];
  }
  return listCopy;
};

function getRecommendationDef(req: Request, res: Response) {
  VideoModel.find({}, null, null)
    .populate("author_id")
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
  const limit = parseInt(req.query.limit as string) ?? 15;
  const data = JSON.parse(
    fs.readFileSync(metaPath + "/video_id_desc.json", "utf8") + "]"
  ) as {
    video_id: string;
    desc: string;
  }[];
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].video_id === videoId) {
      index = i;
      break;
    }
  }

  const indexes = RecommendationUtils.getRecommendedIndexes(index);
  const videoIdList = indexes?.map((idx, _) => {
    return data[idx].video_id;
  });
  VideoModel.find(
    { id_f: { $in: videoIdList } },
    { __v: 0, _id: 0 },
    { limit: limit }
  )
    .populate("author_id")
    .exec((err, doc) => {
      if (err) return res.status(500).send(err);
      else {
        if (!doc) return res.status(404).send({ message: "Video not found" });
        else return res.status(200).send({ message: "Successfully", doc });
      }
    });
}

const RecommendationController = {
  getRecommendationDef,
  getRecommendationFromVideo,
};

export default RecommendationController;
