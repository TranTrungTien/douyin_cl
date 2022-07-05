import * as fs from "fs";
import path from "path";
import Recommendation, { RecommendationUtils } from "./recommendation";

const rawData = fs.readFileSync(
  path.join(__dirname, "..", "assets", "meta", "destination_metadata.json"),
  {
    encoding: "utf8",
  }
);
const data = JSON.parse(rawData) as {
  desc: string;
  video_id: string;
}[];
const metaData = data.map((value, idx) => {
  return value.desc;
});
const recommendation = new Recommendation(metaData);
const cosineMatrix = recommendation.getCosineMatrix();
if (cosineMatrix) {
  // @ts-ignore
  process.send(cosineMatrix);
  // @ts-ignore
} else process.send(null);
