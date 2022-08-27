import * as fs from "fs";
import { metaPath } from "../const/path";
import * as similarity from "string-similarity";

const rawData =
  fs.readFileSync(`${metaPath}/video_id_desc.json`, {
    encoding: "utf8",
  }) + "]";
const data = JSON.parse(rawData) as {
  desc: string;
  video_id: string;
}[];
const metaData = data.map((value, idx) => {
  return value.desc;
});

process.on("message", (dataOptions: { text: string; limit: string }) => {
  const match = similarity.findBestMatch(dataOptions.text, metaData);
  if (process.send) {
    match.ratings.sort((x, y) => y.rating - x.rating);
    const videoIdf = match.ratings
      .slice(0, parseInt(dataOptions.limit) || 20)
      .map((d) => {
        return data.find((v) => v.desc === d.target)?.video_id;
      });
    process.send(videoIdf);
  }
});
