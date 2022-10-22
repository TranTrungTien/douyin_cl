import React from "react";
import Comment from "../../components/comment";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
type Props = {
  isShow?: boolean;
  videoID: string;
  replyNickname?: string;
  replyComments: IComment[];
  likedCommentInComments?: ILikedComment[];
};
const ReplyCommentContainer = ({
  isShow,
  videoID,
  replyNickname,
  replyComments,
  likedCommentInComments,
}: Props) => {
  return (
    <>
      {isShow
        ? replyComments.map((c) => {
            const isLiked = likedCommentInComments?.find((l) => {
              return typeof l.comment_id === "string"
                ? l.comment_id === c._id
                : l.comment_id?._id === c._id;
            });
            return (
              <Comment
                replyCommentID={
                  typeof c.reply_comment_id === "string"
                    ? c.reply_comment_id
                    : c.reply_comment_id?._id
                }
                isLiked={isLiked ? true : false}
                commentID={c._id}
                videoID={videoID}
                nickname={c.author_id.nickname}
                image={c.author_id.avatar_thumb.url_list[0]}
                key={c._id}
                className={!true ? `px-3` : "px-0"}
                uid={c.author_id.uid}
                datePosted={c.createdAt}
                content={c.text}
                likedCount={c.like_count}
                replyCount={c.reply_count}
                replyNickname={replyNickname}
              />
            );
          })
        : null}
    </>
  );
};

export default ReplyCommentContainer;
