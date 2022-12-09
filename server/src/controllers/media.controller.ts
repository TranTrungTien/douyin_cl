import Busboy from "busboy";
import { fips } from "crypto";
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
import { IFollowing } from "../interface/following.inteface";
import CommentModel from "../models/comment.model";
import FollowingModel from "../models/following.model";
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
  const authorId = req.body._id as string;
  const caption = req.body.caption as string;
  const videoIdF = req.body.video_id_f as string;
  const coverIdF = req.body.cover_id_f as string;
  const musicIdF = req.body.music_id_f as string;
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
  if (
    !videoIdF ||
    !coverIdF ||
    !musicIdF ||
    !whoCanView ||
    !allowUserDo ||
    !videoMetaData
  ) {
    return res
      .status(400)
      .send({ message: "video idf cover idf music idf ... missing!" });
  }
  if (!mongoose.isValidObjectId(authorId)) {
    return res.status(400).send({ message: "author id needed" });
  }

  const url = `api/v1/media/play?video_id_f=${videoIdF}&mimeType=${videoMetaData.type}&size=${videoMetaData.size}`;
  const coverUrl = `api/v1/image/cover?cover_id_f=${coverIdF}`;
  const musicUrl = `api/v1/music/play?music_id_f=${musicIdF}`;

  const musicDoc = await new MusicModel({
    id_f: musicIdF,
    author_id: authorId,
    play_addr: {
      url_list: [musicUrl],
    },
    duration: videoMetaData.duration,
    title: "",
  }).save();
  const videoDoc = await new VideoModel({
    id_f: videoIdF,
    desc: caption,
    author_id: authorId,
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
    "," + JSON.stringify({ video_id: videoIdF, desc: caption }),
    { encoding: "utf-8" }
  );
  await RecommendationUtils.trainRecommendedBasedOnVideo();
  console.log("training again done ....");
  return res.status(201).send({ message: "Successfully", data: videoDoc });
};

const getVideoStream = async (req: Request, res: Response) => {
  const videoIdF = req.query.video_id_f as string;
  if (!videoIdF) {
    return res.status(400).send({ message: "video id missing" });
  }
  try {
    const filePath = `${videoPath}/${videoIdF}.mp4`;
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(res);
    } else return res.status(404).send({ message: "Not Found" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getVideoCover = async (req: Request, res: Response) => {
  const coverIdF = req.query.cover_id_f as string;
  if (!coverIdF) {
    return res.status(400).send({ message: "cover id missing" });
  }
  try {
    const coverP = `${coverPath}/${coverIdF}.png`;
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
  const videoId = req.query.video_id as string;
  if (!mongoose.isValidObjectId(videoId)) {
    return res.status(400).send({ message: "video id missing" });
  }
  try {
    const data = await VideoModel.findById(
      videoId,
      { createdAt: 0, updatedAt: 0, __v: 0 },
      null
    )
      .populate("author_id")
      .exec();
    return res.status(200).send({ message: "Successfully", data });
  } catch (error) {
    return res.status(500).send({ error, message: "Something went wrong" });
  }
};

const getAllVideoByUser = async (req: Request, res: Response) => {
  const authorId = req.query.author_id as string;
  const currentUserId = req.query.current_user_id as string;
  const cursor = req.query.cursor as string;
  const limit = parseInt(req.query.limit as string) || 15;
  const isSameUser = currentUserId === authorId;
  if (!mongoose.isValidObjectId(authorId)) {
    return res.status(400).send({ message: "author id is missing" });
  }
  if (!cursor || !limit) {
    return res.status(400).send({ message: "cursor and limit are missing" });
  }
  try {
    const videoDocList = await VideoModel.find(
      {
        author_id: authorId,
        who_can_view: {
          $nin: isSameUser
            ? []
            : currentUserId
            ? ["Private"]
            : ["Private", "Friend"],
        },
      },
      { createdAt: 0, updatedAt: 0, __v: 0 },
      { skip: Number(cursor) * limit, limit: limit, sort: { createdAt: -1 } }
    ).exec();
    let followData: null | IFollowing = null;
    if (currentUserId && mongoose.isValidObjectId(currentUserId)) {
      followData = await FollowingModel.findOne(
        {
          author_id: currentUserId,
          follow: authorId,
        },
        {
          __v: 0,
          _id: 0,
        }
      ).exec();
    }
    const filterData = videoDocList.filter((v) =>
      isSameUser
        ? true
        : v.who_can_view === "Public"
        ? true
        : v.who_can_view === "Friend" &&
          followData &&
          followData.follow.toString() === v.author_id._id.toString()
        ? true
        : false
    );
    const idList = filterData.map((v) => v._id);
    const statistics = await StatisticsModel.find(
      { video_id: { $in: idList } },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    ).exec();
    const videos = filterData.map((v) => {
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
  const cursor = req.query.cursor as string;
  const limit = parseInt(req.query.limit as string) || 15;
  const authorId = req.query.author_id as string;
  if (!mongoose.isValidObjectId(authorId)) {
    return res.status(400).send({ message: "author id are missing" });
  }
  if (!cursor || !limit) {
    return res.status(400).send({ message: "cursor and limit are missing" });
  }
  try {
    const likedDocList = await LikedModel.find(
      { author_id: authorId },
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
  const authorId = req.query.author_id as string;
  if (!mongoose.isValidObjectId(authorId)) {
    return res.status(400).send({ message: "author id is missing" });
  }
  try {
    const videoTotal = await VideoModel.countDocuments({
      author_id: authorId,
    }).exec();
    const likedTotal = await LikedModel.countDocuments({
      author_id: authorId,
    }).exec();
    return res.status(200).send({ message: "Success", videoTotal, likedTotal });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getAvatarThumbnail = async (req: Request, res: Response) => {
  const avatarId = req.query.avatar_id as string;
  if (!avatarId) {
    return res.status(400).send({ message: "avatar id is missing" });
  }
  try {
    fs.createReadStream(
      avatarPath + "/avatar_thumbs/" + avatarId + ".jpg"
    ).pipe(res);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const deleteVideo = async (req: Request, res: Response) => {
  const authorId = req.body._id as string;
  const videoId = req.query.video_id as string;
  if (
    !mongoose.isValidObjectId(authorId) ||
    !mongoose.isValidObjectId(videoId)
  ) {
    return res.status(400).send({ message: "author id video id are missing" });
  }
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
