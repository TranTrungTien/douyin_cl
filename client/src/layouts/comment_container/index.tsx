import { SyntheticEvent, useMemo } from "react";
import Comment from "../../components/comment";
import CommentHeader from "../../components/comment_box_header";
import Input from "../../components/input";
import { useFetchAppend } from "../../hooks/use_fetch_append";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import { RightBarAction } from "../video_slide";

type Props = {
  videoID: string;
  fromVideoPage?: boolean;
  commentsCount?: number;
  onCloseComment?: (action: RightBarAction) => void;
};

const CommentContainer = ({
  onCloseComment,
  commentsCount,
  videoID,
  fromVideoPage,
}: Props) => {
  const user = useAppSelector((state) => state.user);
  const commentParams = useMemo(() => {
    return {
      video_id: videoID,
    };
  }, [videoID]);
  const { data: comments, setData: setComments } = useFetchAppend<
    IComment,
    any
  >(
    servicesPath.GET_ALL_COMMENTS_OF_VIDEO,
    commentParams,
    undefined,
    undefined,
    videoID ? true : false
  );

  const { data: likedComments } = useFetchAppend<ILikedComment, any>(
    servicesPath.GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR,
    commentParams,
    undefined,
    undefined,
    user.data?.uid ? true : false,
    true
  );

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
      user.data && (newComment.author_id = user.data);

      setComments((state) => {
        if (state)
          return {
            ...state,
            list: [...state.list, newComment],
          };
        else
          return {
            message: commentRes.data.message,
            list: [newComment],
            statistics: [],
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
        {user.data && (
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
      <div className="w-full h-auto overflow-auto hidden-scrollbar">
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
      </div>
    </>
  );
};

export default CommentContainer;
