import axios from "axios";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import Comment from "../../components/comment";
import CommentHeader from "../../components/comment_box_header";
import Input from "../../components/input";
import { servicesPath } from "../../config/app_config";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
import { IComment } from "../../interfaces/comment";
import { useAppSelector } from "../../redux/app/hooks";
import { postData } from "../../services/app_services";
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
    const fetchComment = async () =>
      await axios.get<{
        message: string;
        list: IComment[];
      }>(servicesPath.GET_ALL_COMMENTS_OF_VIDEO, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          video_id: video_id,
        },
      });
    fetchComment()
      .then((res) => {
        setComments(res.data);
      })
      .catch(alert);
  }, [video_id]);
  console.log({ comments });
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      comment: {
        value: string;
      };
      reset: () => void;
    };
    const text = target.comment.value;
    target.reset();
    postData<{ message: string; doc: IComment }>(
      servicesPath.POST_COMMENT,
      {
        video_id: video_id,
        text: text,
      },
      true
    )
      .then((res) => {
        const newComment = res.data.doc;
        user.data && (newComment.author_id = user.data);

        setComments((state) => {
          if (state)
            return {
              ...state,
              list: [...state.list, newComment],
            };
          else
            return {
              message: res.data.message,
              list: [newComment],
            };
        });
      })
      .catch(alert);
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
          ? comments.list.map((c, index) => (
              <Comment
                nickname={c.author_id.nickname}
                image={c.author_id.avatar_thumb.url_list[0]}
                key={index}
                styleArray={!fromVideoPage ? `px-3` : "px-0"}
                uid={c.author_id.uid}
                datePosted={c.createdAt}
                content={c.text}
              />
            ))
          : null}
        <Comment
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
        />
        <Comment
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
        />
        <Comment
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
        />
        <Comment
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
        />
        <Comment
          styleArray={!fromVideoPage ? `px-3` : "px-0"}
          uid="fake"
          datePosted={new Date().toISOString()}
          content={"ffffffffffffffff"}
        />
      </div>
    </>
  );
};

export default CommentContainer;
