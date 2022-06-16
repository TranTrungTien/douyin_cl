import Busboy from "busboy";
import { Request, Response } from "express";
import drive from "../utils/googledrive";
import { v4 } from "uuid";
import * as fs from "fs";
import path from "path";

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

function get_video(req: Request, res: Response) {
  const link = req.query.link as string;
  console.log(link);

  const videoStream = fs.createReadStream(path.join(__dirname, link));
  videoStream.pipe(res);
}

const MediaController = {
  upload,
  get_video,
};

export default MediaController;
