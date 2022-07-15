import Busboy from "busboy";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import { v4 } from "uuid";
import { avatarPath, coverPath, videoPath } from "../const/path";
import LikedModel from "../models/liked.model";
import VideoModel from "../models/video.model";

function uploadFile(req: Request, res: Response) {
  let hasFinished = false;
  let filesCounter = 0;
  let info: any = null;
  const busboy = Busboy({ headers: req.headers });
  busboy.on("file", async (fileName, fileStream, fileInfo) => {
    const videoType = fileInfo.mimeType.includes("video");
    const filePath = videoType
      ? `${videoPath}/${v4()}.mp4`
      : `${coverPath}/${v4()}_cover.png`;
    fileStream.pipe(fs.createWriteStream(filePath));
    ++filesCounter;
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
  const _id = req.body._id as string;
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

  const url = `http://localhost:3001/api/v1/media/get-stream-video?video_id=${video_id}&mimeType=${videoMetaData.type}&size=${videoMetaData.size}`;
  const coverUrl = `http://localhost:3001/api/v1/media/get-video-cover?cover_id=${cover_id}`;

  const video = new VideoModel({
    author: _id,
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
      return res.status(201).send({ message: "Successfully", doc });
    })
    .catch((err) => res.status(500).send({ message: "Successfully", err }));
}

function getVideoStream(req: Request, res: Response) {
  const video_id_f = req.query.video_id_f as string;
  try {
    const filePath = `${videoPath}/${video_id_f}.mp4`;
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(res);
    } else return res.status(404).send({ message: "Not Found" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
}

function getVideoCover(req: Request, res: Response) {
  const cover_id_f = req.query.cover_id_f as string;
  try {
    const coverP = `${coverPath}/${cover_id_f}.png`;
    if (fs.existsSync(coverP)) {
      fs.createReadStream(coverP).pipe(res);
    }
  } catch (error) {
    return res.status(500).send({ message: "Successfully", error });
  }
}

function getVideoInfo(req: Request, res: Response) {
  const video_id = req.query.video_id as string;
  if (!video_id) {
    return res.status(400).send("Video id is needed");
  } else {
    VideoModel.findById(video_id, null, null)
      .populate("author_id")
      .exec((err, doc) => {
        if (err) return res.status(500).send({ err });
        else {
          if (!doc) return res.status(404).send({ message: "not found" });
          else return res.status(200).send({ message: "Successfully", doc });
        }
      });
  }
}

function getAllVideoByUser(req: Request, res: Response) {
  const author_id = req.query.author_id as string;
  const cursor = req.query.cursor as string;
  VideoModel.find(
    { author_id: author_id },
    null,
    { skip: Number(cursor) * 10, limit: 10 },
    (err, list) => {
      if (err)
        return res.status(500).send({ err, message: "Something went wrong" });
      else {
        if (list.length <= 0)
          return res.status(404).send({ err, message: "No videos found" });
        else return res.status(200).send({ message: "Found", list });
      }
    }
  );
}

function getTotalDocuments(req: Request, res: Response) {
  const author_id = req.query.author_id as string;
  VideoModel.countDocuments(
    { author_id: author_id },
    undefined,
    (err, ownVideoTotal) => {
      if (err)
        return res.status(500).send({ err, message: "Error getting videos" });
      else {
        LikedModel.countDocuments(
          { author_id: author_id },
          undefined,
          (err, likedVideoTotal) => {
            if (err)
              return res
                .status(500)
                .send({ err, message: "Error getting videos" });
            else {
              return res
                .status(200)
                .send({ message: "Success", ownVideoTotal, likedVideoTotal });
            }
          }
        );
      }
    }
  );
}
function getAvatarThumbnail(req: Request, res: Response) {
  const avatar_id = req.query.avatar_id as string;
  fs.createReadStream(avatarPath + "/avatar_thumbs/" + avatar_id + ".jpg").pipe(
    res
  );
}
const MediaController = {
  getAvatarThumbnail,
  getAllVideoByUser,
  getVideoCover,
  getVideoStream,
  uploadFile,
  uploadMetaData,
  getVideoInfo,
  getTotalDocuments,
};

export default MediaController;
