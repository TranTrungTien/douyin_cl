import * as fs from "fs";
import { metaPath } from "../const/path";
import * as similarity from "string-similarity";

const rawData =
  fs.readFileSync(`${metaPath}/rbc_data.json`, {
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
    const videoData = match.ratings.map((r, index) => {
      return {
        rating: r.rating,
        idf: data[index].video_id,
      };
    });
    videoData.sort((x, y) => y.rating - x.rating);
    const videoIdf = videoData
      .slice(0, parseInt(dataOptions.limit) || 20)
      .map((d) => d.idf);
    process.send(videoIdf);
  }
});
