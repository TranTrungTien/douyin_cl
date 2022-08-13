import { SyntheticEvent, useEffect, useState } from "react";
import Comment from "../../components/comment";
import CommentHeader from "../../components/comment_box_header";
import Input from "../../components/input";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import { getData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import { RightBarAction } from "../video_slide";

type Props = {
  video_id: string;
  fromVideoPage?: boolean;
  handleCloseComment?: (action: RightBarAction) => void;
};

const CommentContainer = ({
  handleCloseComment,
  video_id,
  fromVideoPage,
}: Props) => {
  const user = useAppSelector((state) => state.user);
  const [comments, setComments] = useState<{
    message: string;
    list: IComment[];
  } | null>(null);
  useEffect(() => {
    const fetchComment = async () => {
      const commentRes = await getData<{
        message: string;
        list: IComment[];
      }>(servicesPath.GET_ALL_COMMENTS_OF_VIDEO, {
        video_id: video_id,
      }).catch(console.error);
      if (commentRes && commentRes.data) {
        setComments(commentRes.data);
      }
    };
    if (video_id) {
      fetchComment();
    }
  }, [video_id]);

  const [likedComments, setLikedComments] = useState<{
    message: string;
    list: ILikedComment[];
  } | null>(null);

  useEffect(() => {
    const fetchLikedComments = async () => {
      const likedCommentsRes = await getData<{
        message: string;
        list: ILikedComment[];
      }>(
        servicesPath.GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR,
        { video_id: video_id },
        true
      ).catch(console.error);
      if (likedCommentsRes && likedCommentsRes.data) {
        setLikedComments(likedCommentsRes.data);
      }
    };
    if (user.data) {
      fetchLikedComments();
    }
  }, [user.data, video_id]);

  const onSubmit = async (e: SyntheticEvent) => {
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
        video_id: video_id,
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
          handleCloseComment={handleCloseComment && handleCloseComment}
          fromVideoPage={fromVideoPage}
        />
        {user.data && <Input onSubmit={onSubmit} />}
      </div>
      <div className="w-full h-auto overflow-auto hidden-scrollbar">
        {comments && comments.list.length
          ? comments.list.map((c, index) => {
              console.log({ likedComments });

              const isLiked = likedComments?.list.find((l) => {
                return l.comment_id._id === c._id;
              });
              return (
                <Comment
                  isLiked={isLiked ? true : false}
                  comment_id={c._id}
                  video_id={video_id}
                  nickname={c.author_id.nickname}
                  image={c.author_id.avatar_thumb.url_list[0]}
                  key={c._id}
                  styleArray={!fromVideoPage ? `px-3` : "px-0"}
                  uid={c.author_id.uid}
                  datePosted={c.createdAt}
                  content={c.text}
                  likedCount={c.like_count}
                  replyCount={c.reply_count}
                />
              );
            })
          : null}
        {/* <Comment
          video_id=""
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
          likedCount={100}
          replyCount={0}
        />
        <Comment
          video_id=""
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
          likedCount={100}
          replyCount={0}
        />
        <Comment
          video_id=""
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
          likedCount={100}
          replyCount={0}
        />
        <Comment
          video_id=""
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
          likedCount={100}
          replyCount={0}
        />
        <Comment
          video_id=""
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
          likedCount={100}
          replyCount={0}
        /> */}
      </div>
    </>
  );
};

export default CommentContainer;
