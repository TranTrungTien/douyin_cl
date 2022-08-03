import { IUser } from "./user.interface";
import { IVideo } from "./video.interface";

export interface IComment {
  _id?: string;
  author_id: IUser;
  video_id: IVideo;
  text: string;
  reply_comment_id?: IComment;
  reply_count: number;
  like_count: number;
  delete_comment: boolean;
  createdAt?: string;
  updatedAt?: string;
}
