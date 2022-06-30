import Busboy from "busboy";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import { v4 } from "uuid";
import VideoModel from "../models/video.model";
import drive from "../utils/googledrive";

function uploadFile(req: Request, res: Response) {
  let hasFinished = false;
  let filesCounter = 0;
  let info: any = null;
  const busboy = Busboy({ headers: req.headers });
  busboy.on("file", async (fileName, fileStream, fileInfo) => {
    ++filesCounter;
    try {
      const parent =
        fileInfo.mimeType === "image/png"
          ? "1odDA2Zk0mh4TCUCgnNKlF2T1azxDDMfl"
          : "1ZTq64kfZrPGT5lhQQA8MWe7TEoXQERTz";
      const response: any = await drive.files.create({
        requestBody: {
          name: `${v4()}-${fileName}`,
          mimeType: fileInfo.mimeType,
          parents: [parent],
        },
        media: {
          mimeType: fileInfo.mimeType,
          body: fileStream,
        },
      });
      if (response) {
        --filesCounter;
        if (fileInfo.mimeType !== "image/png") info = response.data;
      }
      if (filesCounter === 0 && hasFinished) {
        return res.status(201).send({ message: "Successfully", info });
      }
    } catch (error) {
      return res.status(201).send(error);
    }
  });
  busboy.on("error", (e) => {
    console.log({ e });
  });
  busboy.on("finish", () => {
    console.log("finish busboy");
    hasFinished = true;
  });
  busboy.on("close", () => {
    console.log("close busboy");
  });
  req.pipe(busboy);
}

function uploadMetaData(req: Request, res: Response) {
  const uid = req.body.uid as string;
  const caption = req.body.caption as string;
  const video_id = req.body.video_id as string;
  const cover_id = req.body.cover_id as string;
  const videoMetaData = req.body.videoMetaData as {
    width: number;
    height: number;
    type: string;
    size: number;
    duration: number;
  };

  const url = `http://localhost:3001/api/v1/media/get-stream-video2?video_id=${video_id}&mimeType=${videoMetaData.type}&size=${videoMetaData.size}`;
  const coverUrl = `http://localhost:3001/api/v1/media/get-video-cover?cover_id=${cover_id}`;

  const video = new VideoModel({
    author: {
      uid: uid,
    },
    desc: caption,
    music: {
      author_id: uid,
      id: v4(),
      title: "Music of own author",
      duration: videoMetaData.duration,
    },
    video: {
      width: videoMetaData.width,
      height: videoMetaData.height,
      mimeType: videoMetaData.type,
      size: videoMetaData.size,
      duration: videoMetaData.duration,
      play_addr: {
        url_list: [url],
      },
      origin_cover: {
        url_list: [coverUrl],
      },
    },
    video_id: video_id,
  });
  video
    .save()
    .then((doc) => {
      return res.status(201).send(doc);
    })
    .catch((err) => res.status(500).send(err));
}

function getVideoStreamLocal(req: Request, res: Response) {
  const link = req.query.link as string;
  console.log(link);
  const filePath = path.join(__dirname, link);
  if (fs.existsSync(filePath)) {
    const videoStream = fs.createReadStream(filePath);
    videoStream.pipe(res);
  } else return res.status(404).send("not found");
}

function getVideoStream(req: Request, res: Response) {
  const video_id = req.query.video_id as string;

  try {
    drive.files.get(
      {
        fileId: video_id,
        alt: "media",
      },
      {
        responseType: "stream",
      },
      (err, data) => {
        if (err) throw err;
        else {
          data?.data.pipe(res);
        }
      }
    );
  } catch (error) {
    console.log({ getvideoAccess: error });
    return res.status(500).send({ getvideoAccess: error });
  }
}

function getVideoCover(req: Request, res: Response) {
  const cover_id = req.query.cover_id as string;
  try {
    drive.files.get(
      {
        fileId: cover_id,
        alt: "media",
      },
      {
        responseType: "stream",
      },
      (err, data) => {
        if (err) throw err;
        if (data) {
          res.writeHead(200);
          data.data
            .on("end", () => console.log("done"))
            .on("error", (error) => console.log(error))
            .pipe(res);
        }
      }
    );
  } catch (error) {
    console.log({ getimageAccess: error });
    return res.status(500).send({ getimageAccess: error });
  }
}

function getVideoInfo(req: Request, res: Response) {
  const video_id = req.query.id as string;
  if (!video_id) {
    return res.status(400).send("Video id is needed");
  } else {
    VideoModel.findOne({ video_id: video_id }, null, null, (err, doc) => {
      if (err) return res.status(500).send({ err });
      else {
        if (!doc) return res.status(404).send({ message: "not found" });
        else return res.status(200).send({ message: "Successfully", doc });
      }
    });
  }
}

const MediaController = {
  getVideoCover,
  getVideoStream,
  uploadFile,
  uploadMetaData,
  getVideoStreamLocal,
  getVideoInfo,
};

export default MediaController;
