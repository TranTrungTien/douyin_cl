import Busboy from "busboy";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import { v4 } from "uuid";
import {
  avatarPath,
  coverPath,
  metaPath,
  musicPath,
  videoPath,
} from "../const/path";
import LikedModel from "../models/liked.model";
import MusicModel from "../models/music.model";
import StatisticsModel from "../models/statistics.model";
import VideoModel from "../models/video.model";
import { convertMp4ToMp3 } from "../utils/convertMp4ToMp3";

function uploadFile(req: Request, res: Response) {
  let hasFinished = false;
  let filesCounter = 0;
  let info: { id_f: string } = { id_f: "" };
  const busboy = Busboy({ headers: req.headers });
  const id_f = v4();
  busboy.on("file", (fileName, fileStream, fileInfo) => {
    const type = fileInfo.mimeType;

    if (type.includes("video")) {
      const videoFilePath = `${videoPath}/${id_f}.mp4`;
      fileStream.pipe(fs.createWriteStream(videoFilePath)).on("close", () => {
        info["id_f"] = id_f;
        ++filesCounter;
        const musicFilePath = `${musicPath}/${id_f}_music.mp3`;
        convertMp4ToMp3(videoFilePath, musicFilePath)
          .then((_) => {
            ++filesCounter;
            if (filesCounter === 3 && hasFinished)
              return res.status(201).send(info);
          })
          .catch(console.error);
      });
    } else {
      const coverFilePath = `${coverPath}/${id_f}_cover.png`;
      fileStream.pipe(
        fs.createWriteStream(coverFilePath).on("close", () => {
          ++filesCounter;
          if (filesCounter === 3 && hasFinished)
            return res.status(201).send(info);
        })
      );
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
  const _id = req.body._id as string;
  const caption = req.body.caption as string;
  const video_id_f = req.body.video_id_f as string;
  const cover_id_f = req.body.cover_id_f as string;
  const music_id_f = req.body.music_id_f as string;
  const whoCanView = req.body.whoCanView as string;
  const allowUserDo = req.body.allowUserDo as {
    cmt: boolean;
    duet: boolean;
    stich: boolean;
  };
  const videoMetaData = req.body.videoMetaData as {
    width: number;
    height: number;
    type: string;
    size: number;
    duration: number;
  };

  const url = `api/v1/media/play?video_id_f=${video_id_f}&mimeType=${videoMetaData.type}&size=${videoMetaData.size}`;
  const coverUrl = `api/v1/image/cover?cover_id_f=${cover_id_f}`;
  const musicUrl = `api/v1/music/play?music_id_f=${music_id_f}`;

  const music = new MusicModel({
    id_f: music_id_f,
    author_id: _id,
    play_addr: {
      url_list: [musicUrl],
    },
    duration: videoMetaData.duration,
    title: "",
  });

  music.save((err, doc) => {
    if (err)
      return res
        .status(500)
        .send({ message: "  Error saving music  , error: " + err });
    else {
      const video = new VideoModel({
        id_f: video_id_f,
        desc: caption,
        author_id: _id,
        width: videoMetaData.width,
        height: videoMetaData.height,
        mimeType: videoMetaData.type,
        size: videoMetaData.size,
        duration: videoMetaData.duration,
        allow_user_do: {
          comment: allowUserDo.cmt,
          duet: allowUserDo.duet,
          stich: allowUserDo.stich,
        },
        who_can_view: whoCanView,
        origin_cover: {
          url_list: [coverUrl],
        },
        play_addr: {
          url_list: [url],
        },
        music_id: doc._id,
      });
      video
        .save()
        .then((doc) => {
          fs.appendFileSync(
            `${metaPath}/video_id_desc.json`,
            "," + JSON.stringify({ video_id: video_id_f, desc: caption }),
            { encoding: "utf-8" }
          );
          return res.status(201).send({ message: "Successfully", doc });
        })
        .catch((err) => res.status(500).send({ message: "Successfully", err }));
    }
  });
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
    } else {
      res.status(404).send({ message: "video cover not found" });
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
    VideoModel.findById(video_id, { createdAt: 0, updatedAt: 0, __v: 0 }, null)
      .populate("author_id")
      .exec((err, doc) => {
        if (err)
          return res.status(500).send({ err, message: "Something went wrong" });
        else {
          if (!doc)
            return res.status(404).send({ message: "Not found video data" });
          else return res.status(200).send({ message: "Successfully", doc });
        }
      });
  }
}

function getAllVideoByUser(req: Request, res: Response) {
  const author_id = req.query.author_id as string;
  const cursor = req.query.cursor as string;
  const limit = parseInt(req.query.limit as string) || 15;

  VideoModel.find(
    { author_id: author_id },
    { createdAt: 0, updatedAt: 0, __v: 0 },
    { skip: Number(cursor) * limit, limit: limit, sort: { createdAt: -1 } },
    (err, list) => {
      if (err)
        return res.status(500).send({ err, message: "Something went wrong" });
      else {
        if (list.length <= 0)
          return res.status(404).send({ err, message: "No videos found" });
        else {
          const idList = list.map((v) => v._id);
          StatisticsModel.find(
            { video_id: { $in: idList } },
            {
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
            },
            null,
            (err, statistics) => {
              if (err)
                return res
                  .status(500)
                  .send({ message: "Something went wrong", err });
              else {
                const videos = list.map((v) => {
                  const stat = statistics.find(
                    (stat) => stat.video_id.toString() === v._id?.toString()
                  );
                  return {
                    video: v,
                    statistics: stat,
                  };
                });
                return res.status(200).send({
                  message: "Found videos Successfully",
                  list: videos,
                });
              }
            }
          );
        }
      }
    }
  );
}

function getAllLikedVideoByUser(req: Request, res: Response) {
  const author_id = req.query.author_id as string;
  const cursor = req.query.cursor as string;
  const limit = parseInt(req.query.limit as string) || 15;
  LikedModel.find(
    { author_id: author_id },
    { createdAt: 0, updatedAt: 0, __v: 0 },
    {
      skip: Number(cursor) * limit,
      limit: limit,
    }
  )
    .populate("author_id")
    .populate("video_id")
    .exec((err, list) => {
      if (err)
        return res.status(500).send({ err, message: "Something went wrong" });
      else {
        if (list.length <= 0)
          return res.status(404).send({ err, message: "No videos found" });
        else {
          const idList = list.map((v) => v.video_id._id);
          StatisticsModel.find(
            {
              video_id: { $in: idList },
            },
            { createdAt: 0, updatedAt: 0, __v: 0 },
            null,
            (err, statistics) => {
              if (err)
                return res
                  .status(500)
                  .send({ err, message: "Something went wrong" });
              else {
                const videos = list.map((v) => {
                  const stat = statistics.find(
                    (stat) =>
                      stat.video_id.toString() === v.video_id._id.toString()
                  );
                  return {
                    video: v,
                    statistics: stat,
                  };
                });
                return res.status(200).send({
                  message: "Found liked video Successfully",
                  list: videos,
                });
              }
            }
          );
        }
      }
    });
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
  getAllLikedVideoByUser,
  getVideoCover,
  getVideoStream,
  uploadFile,
  uploadMetaData,
  getVideoInfo,
  getTotalDocuments,
};

export default MediaController;
