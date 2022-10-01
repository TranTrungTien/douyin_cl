import React from "react";
import Comment from "../../components/comment";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
type Props = {
  isShow?: boolean;
  videoID: string;
  replyComments: IComment[];
  likedCommentInComments?: ILikedComment[];
};
const ReplyCommentContainer = ({
  isShow,
  videoID,
  replyComments,
  likedCommentInComments,
}: Props) => {
  return (
    <>
      {isShow
        ? replyComments.map((c, index) => {
            console.log({ c });
            const isLiked = likedCommentInComments?.find((l) => {
              return l.comment_id._id === c._id;
            });
            return (
              <Comment
                replyCommentID={c.reply_comment_id?._id}
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
              />
            );
          })
        : null}
    </>
  );
};

export default ReplyCommentContainer;
