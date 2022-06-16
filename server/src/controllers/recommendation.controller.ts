import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
function getRecommendationDef(req: Request, res: Response) {
  const rawData = fs.readFileSync(
    path.join(__dirname, "videos", "meta_data.json"),
    {
      encoding: "utf8",
    }
  );
  const data = JSON.parse(rawData);
  const list = data.slice(0, 20);

  res.status(200).send({ list });
}

const RecommendationController = {
  getRecommendationDef,
};

export default RecommendationController;
