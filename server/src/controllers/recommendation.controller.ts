import { Request, Response } from "express";
import * as fs from "fs";
import { metaPath } from "../const/path";
import LikedModel from "../models/liked.model";
import StatisticsModel from "../models/statistics.model";
import VideoModel from "../models/video.model";
import { dayOfTwoDate } from "../utils/day_of_two_date";
import { RecommendationUtils } from "../utils/recommendation";

async function getRecommendationDef(req: Request, res: Response) {
  const userID = req.query.user_id as string;
  const likedList = await LikedModel.find(
    { author_id: userID },
    { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 },
    null
  );
  const videoIds = likedList.map((x) => x.video_id);
  VideoModel.find(
    {
      _id: {
        $nin: videoIds,
      },
      createdAt: {
        $gt: new Date("2020-03-01"),
      },
    },
    { updatedAt: 0, __v: 0 },
    null
  )
    .populate("author_id")
    .sort({
      createdAt: -1,
    })
    .exec((err, list) => {
      if (err) res.status(500).send({ message: "Error", err });
      else {
        if (!list) return res.status(404).send({ message: "List not found" });
        else {
          StatisticsModel.find(
            {
              video_id: {
                $nin: videoIds,
              },
            },
            { createdAt: 0, updatedAt: 0, __v: 0 },
            null,
            (err, statistics) => {
              if (err)
                res.status(500).send({ message: "not found statistics", err });
              else {
                const currentDate = new Date();
                const weight = list.map((v) => {
                  const stat = statistics.find(
                    (stat) => v._id.toString() === stat.video_id.toString()
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
                    weight: temp / diffDays / 100,
                  };
                });
                weight.sort((x, y) => y.weight - x.weight);
                res.status(200).send({ message: "Successfully", data: weight });
              }
            }
          );
        }
      }
    });
}

function getRecommendationFromVideo(req: Request, res: Response) {
  const videoId = req.query.videoId as string;
  const limit = parseInt(req.query.limit as string) || 15;
  const data = JSON.parse(
    fs.readFileSync(metaPath + "/video_id_desc.json", "utf8") + "]"
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

  const indexes = RecommendationUtils.getRecommendedIndexes(index);
  const videoIdList = indexes?.map((idx, _) => {
    return data[idx].video_id;
  });
  VideoModel.find(
    { id_f: { $in: videoIdList } },
    { createdAt: 0, updatedAt: 0, __v: 0 },
    { limit: limit }
  )
    .populate("author_id")
    .exec((err, list) => {
      if (err)
        return res.status(500).send({ message: "Something went wrong", err });
      else {
        if (!list.length)
          return res.status(404).send({ message: "Video not found" });
        else {
          const idList = list.map((x) => x._id);
          StatisticsModel.find(
            {
              video_id: { $in: idList },
            },
            {
              createdAt: 0,
              updatedAt: 0,
              __v: 0,
              _id: 0,
            },
            { limit: limit },
            (err, statistics) => {
              if (err)
                return res
                  .status(500)
                  .send({ message: "Something went wrong", err });
              else {
                return res
                  .status(200)
                  .send({ message: "Successfully", list, statistics });
              }
            }
          );
        }
      }
    });
}

function getSearchRecommended(req: Request, res: Response) {
  const text = req.body.text as string;
  const limit = req.query.limit as string;
  RecommendationUtils.getSearchRecommended(text, limit)
    .then((videoIdfs) => {
      console.log(videoIdfs[0]);

      VideoModel.find(
        {
          id_f: {
            $in: videoIdfs,
          },
        },
        { createdAt: 0, updatedAt: 0, __v: 0 }
      )
        .populate("author_id")
        .exec((err, list) => {
          if (err) res.status(500).send({ message: "Error", err });
          else {
            if (!list)
              return res.status(404).send({ message: "List not found" });
            else {
              const ids = list.map((v) => v._id);
              StatisticsModel.find(
                {
                  video_id: {
                    $in: ids,
                  },
                },
                { createdAt: 0, updatedAt: 0, __v: 0 },
                null,
                (err, statistics) => {
                  if (err)
                    res
                      .status(500)
                      .send({ message: "not found statistics", err });
                  else {
                    res
                      .status(200)
                      .send({ message: "Successfully", list, statistics });
                  }
                }
              );
            }
          }
        });
    })
    .catch((err) => res.status(500).send(err));
}

const RecommendationController = {
  getRecommendationDef,
  getRecommendationFromVideo,
  getSearchRecommended,
};

export default RecommendationController;
