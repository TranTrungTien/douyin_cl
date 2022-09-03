import { IComment } from "../interface/comment.inteface";
import { IYourVideoLiked } from "../interface/liked.interface";
import { IVideo } from "../interface/video.interface";
import CommentModel from "../models/comment.model";
import LikedModel from "../models/liked.model";
import UserModel from "../models/user.model";
import VideoModel from "../models/video.model";

const findData = () => {
  const videoPs = new Promise<IVideo[]>((resolve, reject) => {
    VideoModel.find({}, (err, list) => {
      if (err) console;
      else {
        resolve(list);
      }
    });
  });
  const userPs = new Promise<string[]>((resolve, reject) => {
    UserModel.find({}, (err, list) => {
      if (err) console;
      else {
        const userIDs = list.map((video) => video._id.toString());
        resolve(userIDs);
      }
    });
  });
  const likedPs = new Promise<IYourVideoLiked[]>((resolve, reject) => {
    LikedModel.find({}, (err, list) => {
      if (err) console;
      else {
        resolve(list);
      }
    });
  });
  const commentPs = new Promise<IComment[]>((resolve, reject) => {
    CommentModel.find({}, (err, list) => {
      if (err) console;
      else {
        resolve(list);
      }
    });
  });
  return Promise.all([videoPs, commentPs, userPs, likedPs]);
};

export const getFeatureAsMatrix = (
  userId: string
): Promise<{
  matrix: number[][];
  list: IVideo[];
  userIndex: number;
}> => {
  return new Promise((resolve, reject) => {
    findData()
      .then((data) => {
        const [videoPs, commentPs, userPs, likedPs] = data;
        const d = [];
        let userIndex = 0;
        for (let i = 0; i < userPs.length; i++) {
          if (userId === userPs[i]) userIndex = i;
          const row = [];
          for (let j = 0; j < videoPs.length; j++) {
            let totalScore = 0;
            for (let k = 0; k < likedPs.length; k++) {
              if (
                likedPs[k]?.author_id?.toString() === userPs[i] &&
                likedPs[k]?.video_id?.toString() === videoPs[j]._id?.toString()
              ) {
                ++totalScore;
                break;
              }
            }
            for (let k = 0; k < commentPs.length; k++) {
              if (
                commentPs[k]?.author_id?.toString() === userPs[i] &&
                commentPs[k]?.video_id?.toString() ===
                  videoPs[j]._id?.toString()
              ) {
                ++totalScore;
                break;
              }
            }
            row.push(totalScore);
          }
          d.push(row);
        }
        resolve({ matrix: d, list: videoPs, userIndex });
      })
      .catch((err) => reject(err));
  });
};
