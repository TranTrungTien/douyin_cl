import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Loading } from "../../components";
import Comment from "../../components/comment";
import CommentHeader from "../../components/comment_box_header";
import Input from "../../components/input";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
import { IUser } from "../../interfaces/user.interface";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import { RightBarAction } from "../video_slide";

type Props = {
  videoID: string;
  fromVideoPage?: boolean;
  commentsCount?: number;
  comments: {
    status: "loading" | "error" | "success";
    list: IComment[];
  } | null;
  user: IUser | null;
  likedComments: {
    status: "loading" | "error" | "success";
    list: ILikedComment[];
  } | null;
  onCloseComment?: (action: RightBarAction) => void;
  setComments: Dispatch<
    SetStateAction<{
      status: "loading" | "error" | "success";
      message?: string | undefined;
      list: IComment[];
    } | null>
  >;
};

const CommentContainer = ({
  onCloseComment,
  user,
  commentsCount,
  videoID,
  fromVideoPage,
  comments,
  likedComments,
  setComments,
}: Props) => {
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      comment: {
        value: string;
      };
      reset: () => void;
    };
    const text = target.comment.value;
    target.reset();
    const commentRes = await postData<{ message: string; doc: IComment }>(
      servicesPath.POST_COMMENT,
      {
        video_id: videoID,
        text: text,
      },
      true
    ).catch(alert);
    if (commentRes && commentRes.data) {
      const newComment = commentRes.data.doc;
      user && (newComment.author_id = user);

      setComments((state) => {
        if (state)
          return {
            ...state,
            status: "success",
            list: [...state.list, newComment],
          };
        else
          return {
            status: "success",
            message: commentRes.data.message,
            list: [newComment],
          };
      });
    }
  };
  return (
    <>
      <div
        className={`shadow-md w-full ${fromVideoPage ? "px-0" : "px-3"} pb-2`}
      >
        <CommentHeader
          commentsCount={commentsCount}
          onCloseComment={onCloseComment}
          fromVideoPage={fromVideoPage}
        />
        {user && (
          <form
            autoComplete="off"
            className="w-full py-1"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="评论 ..."
              autoComplete="off"
              id="comment"
              name="comment"
              type="text"
            />
          </form>
        )}
      </div>
      <div className="w-full h-auto overflow-auto hidden-scrollbar min-h-[calc(100vh/2)] relative">
        {comments && comments.list.length
          ? comments.list.map((c, index) => {
              const isLiked = likedComments?.list.find((l) => {
                return l.comment_id._id === c._id;
              });
              return (
                <Comment
                  isLiked={isLiked ? true : false}
                  commentID={c._id}
                  videoID={videoID}
                  nickname={c.author_id.nickname}
                  image={c.author_id.avatar_thumb.url_list[0]}
                  key={c._id}
                  className={!fromVideoPage ? `px-3` : "px-0"}
                  uid={c.author_id.uid}
                  datePosted={c.createdAt}
                  content={c.text}
                  likedCount={c.like_count}
                  replyCount={c.reply_count}
                />
              );
            })
          : null}
        {!comments && <Loading />}
        {comments && comments.status === "loading" && <Loading />}
      </div>
    </>
  );
};

export default CommentContainer;
