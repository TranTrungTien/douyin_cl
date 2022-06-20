import Busboy from "busboy";
import { Request, Response } from "express";
import drive from "../utils/googledrive";
import { v4 } from "uuid";
import * as fs from "fs";
import path from "path";
import https from "https";

function upload(req: Request, res: Response) {
  const busboy = Busboy({ headers: req.headers });
  busboy.on("file", async (fileName, fileStream, fileInfo) => {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: v4() + "-" + fileName,
          mimeType: fileInfo.mimeType,
          parents: ["1V5cIjKP9hKRrek7KwYYpcqzLTZ8QxZfH"],
        },
        media: {
          mimeType: fileInfo.mimeType,
          body: fileStream,
        },
      });
      return res.status(201).send(response.data);
    } catch (error) {
      throw error;
    }
  });
  busboy.on("error", (e) => {
    console.log({ e });
  });
  busboy.on("finish", () => {
    console.log("finish busboy");
  });
  busboy.on("close", () => {
    console.log("close busboy");
  });
  req.pipe(busboy);
}

function getVideoStream(req: Request, res: Response) {
  const link = req.query.link as string;
  console.log(link);
  const filePath = path.join(__dirname, link);
  if (fs.existsSync(filePath)) {
    const videoStream = fs.createReadStream(filePath);
    videoStream.pipe(res);
  } else return res.status(404).send("not found");
}

function getVideoInfo(req: Request, res: Response) {
  const videoId = req.query.id as string | undefined;
  console.log({ videoId });

  if (!videoId) {
    return res.status(400).send("Video id is needed");
  } else {
    const rawData = fs.readFileSync(
      path.join(__dirname, "videos", "meta_data.json"),
      { encoding: "utf8" }
    );
    const data = JSON.parse(rawData) as {
      author: string;
      local_link: string;
      link: string;
      desc: string;
    }[];
    const info = data.filter((video) => video.local_link.includes(videoId));
    console.log({ info });

    return res.status(200).send(info);
  }
}

const MediaController = {
  upload,
  getVideoStream,
  getVideoInfo,
};

export default MediaController;
