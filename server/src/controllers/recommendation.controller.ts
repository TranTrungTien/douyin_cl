import { spawn } from "child_process";
import { Request, Response } from "express";
import * as fs from "fs";
import mongoose from "mongoose";
import { metaPath } from "../const/path";
import { IVideo } from "../interface/video.interface";
import IHadSeenModel from "../models/had_seen_video.model";
import StatisticsModel from "../models/statistics.model";
import VideoModel from "../models/video.model";
import { dayOfTwoDate } from "../utils/day_of_two_date";
import { getFeatureAsMatrix } from "../utils/mf_data";
import { RecommendationUtils } from "../utils/recommendation";
const getRecommendationDef = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const videoDocList = await VideoModel.find(
      {
        createdAt: {
          $gt: new Date("2020-03-01"),
        },
      },
      { updatedAt: 0, __v: 0 },
      {
        session,
      }
    )
      .populate("author_id")
      .sort({
        createdAt: -1,
      })
      .exec();
    const statistics = await StatisticsModel.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 },
      {
        session,
      }
    ).exec();
    const currentDate = new Date();
    const weight = videoDocList.map((v) => {
      const stat = statistics.find(
        (stat) => v._id?.toString() === stat.video_id.toString()
      );
      const diffDays = dayOfTwoDate(
        currentDate,
        new Date(v?.createdAt || "2020-01-01T00:00:00")
      );
      const temp =
        (stat?.stars_count || 0) +
        (stat?.comment_count || 0) +
        (stat?.like_count || 0) +
        (stat?.share_count || 0);
      return {
        video: v,
        statistics: stat,
        w: temp / diffDays / 100,
      };
    });
    weight.sort((x, y) => y.w - x.w);
    res.status(200).send({ message: "Successfully", list: weight });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const getRecommendationFromVideo = async (req: Request, res: Response) => {
  const videoId = req.query.videoId as string;
  const limit = parseInt(req.query.limit as string) || 15;
  const data = JSON.parse(
    fs.readFileSync(metaPath + "/rbc_data.json", "utf8") + "]"
  ) as {
    video_id: string;
    desc: string;
  }[];
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].video_id === videoId) {
      index = i;
      break;
    }
  }

  const indexes = RecommendationUtils.getRecommendedBasedOnVideoIndexes(index);
  const videoIdList = indexes?.map((idx, _) => {
    return data[idx].video_id;
  });
  const videoDocList = await VideoModel.find(
    { id_f: { $in: videoIdList } },
    { createdAt: 0, updatedAt: 0, __v: 0 },
    { limit: limit }
  )
    .populate("author_id")
    .exec();
  const idList = videoDocList.map((x) => x._id);
  const statistics = await StatisticsModel.find(
    {
      video_id: { $in: idList },
    },
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      _id: 0,
    },
    { limit: limit }
  ).exec();
  return res
    .status(200)
    .send({ message: "Successfully", list: videoDocList, statistics });
};

const getSearchRecommended = async (req: Request, res: Response) => {
  const text = req.query.text as string;
  const limit = req.query.limit as string;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const videoIdfs = await RecommendationUtils.getSearchRecommended(
      text,
      limit
    );
    const videoDocList = await VideoModel.find(
      {
        id_f: {
          $in: videoIdfs,
        },
      },
      { updatedAt: 0, __v: 0 },
      { session }
    )
      .populate("author_id")
      .exec();
    const ids = videoDocList.map((v) => v._id);
    const statisticsDoc = await StatisticsModel.find(
      {
        video_id: {
          $in: ids,
        },
      },
      { session }
    ).exec();
    return res.status(200).send({
      message: "Successfully",
      list: videoDocList,
      statistics: statisticsDoc,
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};

const training = async (req: Request, res: Response) => {
  const userID = req.body._id as string;
  if (!userID)
    return res.status(404).send({ message: "user id needed", list: [] });
  const { matrix, list, userIndex, likedList } = await getFeatureAsMatrix(
    userID
  );
  const python = spawn("python3", [
    "src/python/mf.py",
    JSON.stringify(matrix),
    userIndex.toString(),
  ]);
  let output = "";

  python.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  python.stdout.on("error", (err) => {
    res.status(500).send({ error: err });
  });
  python.stdout.on("close", () => {
    RecommendationUtils.saveTrainingData(userID, {
      data: output,
      likedList,
      list,
    });
    res.status(200).send({ message: "Successfully" });
  });
};

const list = async (req: Request, res: Response) => {
  const userID = req.body._id as string;
  const { limit, ...rest } = req.query;
  const hadSeenVideos = Object.values(
    rest as {
      [key: string]: string;
    }
  ).map((data) => data);
  const limitParsed = parseInt(limit as string) || 10;
  if (!userID)
    return res.status(404).send({ message: "user id needed", list: [] });

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const hadSeenDoc = await IHadSeenModel.findOneAndUpdate(
      {
        author_id: userID,
      },
      {
        $push: {
          had_seen_videos: hadSeenVideos,
        },
      },
      {
        new: true,
        upsert: true,
        session,
      }
    ).exec();
    const output = RecommendationUtils.getTrainingData(userID);
    if (output) {
      const { data: trainingData, likedList, list } = output;
      const data: ({ video: IVideo; w: number } | null)[] = trainingData
        .split(" ")
        .map((item, index) => {
          return item
            ? {
                video: list[index],
                w: parseFloat(item),
              }
            : null;
        })
        .filter((item) =>
          likedList.find(
            (x) =>
              x.video_id.toString() === item?.video?._id?.toString() &&
              x.author_id.toString() === userID
          ) ||
          hadSeenDoc?.had_seen_videos.find(
            (videoId) => videoId.toString() === item?.video?._id?.toString()
          )
            ? false
            : true
        )
        .slice(0, limitParsed)
        .sort((x, y) => {
          if (x && y) {
            return y.w - x.w;
          } else {
            return 0;
          }
        });
      const videoIds = data.map((x) => x?.video?._id?.toString());
      const statistics = await StatisticsModel.find(
        {
          video_id: {
            $in: videoIds,
          },
        },
        {
          updatedAt: 0,
          __v: 0,
          createdAt: 0,
        },
        { session }
      ).exec();
      const listStatistics = data.map((item) => {
        const stat = statistics.find(
          (x) => x.video_id.toString() === item?.video?._id?.toString()
        );
        return {
          ...item,
          statistics: stat,
        };
      });
      res.status(200).send({
        message: "Successfully",
        list: listStatistics,
      });
    } else {
      return res.status(500).send({ message: "Server error" });
    }
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};
const RecommendationController = {
  list,
  training,
  getRecommendationDef,
  getRecommendationFromVideo,
  getSearchRecommended,
};

export default RecommendationController;
