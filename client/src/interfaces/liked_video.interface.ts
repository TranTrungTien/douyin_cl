import { IComment } from "./comment";
import { IUser } from "./user.interface";
import { IVideo } from "./video.interface";

export interface IYourVideoLiked {
  _id?: string;
  author_id: IUser;
  video_id: IVideo;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILikedComment {
  _id?: string;
  author_id: IUser | string | undefined;
  video_id: IVideo | string | undefined;
  comment_id: IComment | string | undefined;
  reply_comment_id?: IComment | string | undefined;
  createdAt?: string;
  updatedAt?: string;
}
