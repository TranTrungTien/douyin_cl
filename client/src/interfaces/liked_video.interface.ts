import { IUser } from "./user.interface";
import { IVideo } from "./video.interface";

export interface IYourVideoLiked {
  _id?: string;
  author_id: IUser;
  video_id: IVideo;
  createdAt?: string;
  updatedAt?: string;
}
