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

export interface ICommentLiked {
  _id?: string;
  author_id: IUser;
  video_id: IVideo;
  comment_id: IComment;
  reply_comment_id?: IComment;
  createdAt?: string;
  updatedAt?: string;
}
