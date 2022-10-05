import Busboy from "busboy";
import { Request, Response } from "express";
import * as fs from "fs";
import mongoose from "mongoose";
import { v4 } from "uuid";
import {
  avatarPath,
  coverPath,
  metaPath,
  musicPath,
  videoPath,
} from "../const/path";
import CommentModel from "../models/comment.model";
import LikedModel from "../models/liked.model";
import LikedCommentModel from "../models/liked_comment.model";
import MusicModel from "../models/music.model";
import SharedModel from "../models/shared.model";
import StatisticsModel from "../models/statistics.model";
import VideoModel from "../models/video.model";
import { convertMp4ToMp3 } from "../utils/convert_mp4_to_mp3";
import { RecommendationUtils } from "../utils/recommendation";

const uploadFile = async (req: Request, res: Response) => {
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
};

const uploadMetaData = async (req: Request, res: Response) => {
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

  const musicDoc = await new MusicModel({
    id_f: music_id_f,
    author_id: _id,
    play_addr: {
      url_list: [musicUrl],
    },
    duration: videoMetaData.duration,
    title: "",
  }).save();
  const videoDoc = await new VideoModel({
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
    music_id: musicDoc._id,
  }).save();
  await new StatisticsModel({
    video_id: videoDoc._id,
  }).save();
  fs.appendFileSync(
    `${metaPath}/rbc_data.json`,
    "," + JSON.stringify({ video_id: video_id_f, desc: caption }),
    { encoding: "utf-8" }
  );
  await RecommendationUtils.trainRecommendedBasedOnVideo();
  console.log("training again done ....");
  return res.status(201).send({ message: "Successfully", data: videoDoc });
};

const getVideoStream = async (req: Request, res: Response) => {
  const video_id_f = req.query.video_id_f as string;
  try {
    const filePath = `${videoPath}/${video_id_f}.mp4`;
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(res);
    } else return res.status(404).send({ message: "Not Found" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getVideoCover = async (req: Request, res: Response) => {
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
};

const getVideoInfo = async (req: Request, res: Response) => {
  const video_id = req.query.video_id as string;
  if (!video_id) {
    return res.status(400).send("Video id is needed");
  } else {
    try {
      const data = await VideoModel.findById(
        video_id,
        { createdAt: 0, updatedAt: 0, __v: 0 },
        null
      )
        .populate("author_id")
        .exec();
      return res.status(200).send({ message: "Successfully", data });
    } catch (error) {
      return res.status(500).send({ error, message: "Something went wrong" });
    }
  }
};

const getAllVideoByUser = async (req: Request, res: Response) => {
  const author_id = req.query.author_id as string;
  const cursor = req.query.cursor as string;
  const limit = parseInt(req.query.limit as string) || 15;
  try {
    const videoDocList = await VideoModel.find(
      { author_id: author_id },
      { createdAt: 0, updatedAt: 0, __v: 0 },
      { skip: Number(cursor) * limit, limit: limit, sort: { createdAt: -1 } }
    ).exec();
    const idList = videoDocList.map((v) => v._id);
    const statistics = await StatisticsModel.find(
      { video_id: { $in: idList } },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    ).exec();
    const videos = videoDocList.map((v) => {
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
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
      error,
    });
  }
};

const getAllLikedVideoByUser = async (req: Request, res: Response) => {
  const author_id = req.query.author_id as string;
  const cursor = req.query.cursor as string;
  const limit = parseInt(req.query.limit as string) || 15;
  try {
    const likedDocList = await LikedModel.find(
      { author_id: author_id },
      { updatedAt: 0, __v: 0 },
      {
        skip: Number(cursor) * limit,
        limit: limit,
        sort: { createdAt: -1 },
      }
    )
      .populate("author_id")
      .populate("video_id")
      .exec();
    const idList = likedDocList.map((v) => v.video_id._id);
    const statistics = await StatisticsModel.find(
      {
        video_id: { $in: idList },
      },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    const videos = likedDocList.map((v) => {
      const stat = statistics.find(
        (stat) => stat.video_id.toString() === v.video_id._id.toString()
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
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
      error,
    });
  }
};

const getTotalDocuments = async (req: Request, res: Response) => {
  const author_id = req.query.author_id as string;
  try {
    const videoTotal = await VideoModel.countDocuments({
      author_id: author_id,
    }).exec();
    const likedTotal = await LikedModel.countDocuments({
      author_id: author_id,
    }).exec();
    return res.status(200).send({ message: "Success", videoTotal, likedTotal });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getAvatarThumbnail = async (req: Request, res: Response) => {
  const avatar_id = req.query.avatar_id as string;
  try {
    fs.createReadStream(
      avatarPath + "/avatar_thumbs/" + avatar_id + ".jpg"
    ).pipe(res);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const deleteVideo = async (req: Request, res: Response) => {
  const authorId = req.body._id as string;
  const videoId = req.query.video_id as string;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const videoDoc = await VideoModel.findOneAndDelete(
      {
        _id: videoId,
        author_id: authorId,
      },
      {
        session,
      }
    ).exec();
    if (videoDoc) {
      await StatisticsModel.findOneAndDelete(
        {
          video_id: videoDoc._id,
        },
        {
          session,
        }
      ).exec();
      await CommentModel.deleteMany(
        {
          video_id: videoDoc._id,
        },
        {
          session,
        }
      ).exec();
      await LikedModel.deleteMany(
        {
          video_id: videoDoc._id,
        },
        {
          session,
        }
      ).exec();
      await LikedCommentModel.deleteMany(
        {
          video_id: videoDoc._id,
        },
        {
          session,
        }
      ).exec();
      await SharedModel.deleteMany(
        {
          video_id: videoDoc._id,
        },
        {
          session,
        }
      ).exec();
      fs.unlinkSync(`${videoPath}/${videoDoc.id_f}.mp4`);
      fs.unlinkSync(`${coverPath}/${videoDoc.id_f}_cover.png`);
      await session.commitTransaction();
      return res.status(200).send({
        message: "Successfully!",
      });
    } else {
      return res.status(404).send({
        message: "Video Dat Not found!",
      });
    }
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({
      error,
      message: "Something went wrong",
    });
  } finally {
    session.endSession();
  }
};
const MediaController = {
  deleteVideo,
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
