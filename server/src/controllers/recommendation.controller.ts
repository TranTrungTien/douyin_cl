import { fork } from "child_process";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import { RecommendationUtils } from "../utils/recommendation";

function getRecommendationDef(req: Request, res: Response) {
  const rawData = fs.readFileSync(
    path.join(__dirname, "videos", "meta_data.json"),
    {
      encoding: "utf8",
    }
  );
  const list = JSON.parse(rawData);

  console.log(RecommendationUtils.cosineMatrix?.[0]);

  res.status(200).send({ list });
}

function getRecommendationFromVideo(req: Request, res: Response) {
  const videoId = req.query.videoId as string;
  const rawData = fs.readFileSync(
    path.join(__dirname, "videos", "meta_data.json"),
    {
      encoding: "utf8",
    }
  );
  const data = JSON.parse(rawData) as {
    desc: string;
    link: string;
    author: string;
    local_link: string;
  }[];
  let id = 0;
  data.forEach((value, idx) => {
    if (value.local_link === videoId) id = idx;
  });
  const indexes = RecommendationUtils.getRecommendedIndexes(id);

  const recommendedData = indexes?.map((value) => {
    return data[value];
  });
  recommendedData
    ? res.status(200).send(recommendedData)
    : res.status(404).send("err");
}

const RecommendationController = {
  getRecommendationDef,
  getRecommendationFromVideo,
};

export default RecommendationController;
