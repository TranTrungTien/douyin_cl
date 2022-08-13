import { memo, MouseEvent, SyntheticEvent, useEffect, useState } from "react";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import { deleteData, getData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import { convertDate } from "../../utils/covert_date";
import AvatarCardLink from "../avatar_card_link";
import Heart from "../heart";
import Input from "../input";

type Props = {
  nickname?: string;
  datePosted?: string;
  styleArray?: string;
  content: string;
  image?: string;
  uid: string;
  likedCount?: number;
  replyCount?: number;
  video_id: string;
  comment_id?: string;
  isLiked?: boolean;
};

const Comment = ({
  comment_id,
  video_id,
  replyCount,
  likedCount,
  styleArray,
  image,
  datePosted,
  content,
  nickname = "ღ᭄余生ꦿ࿐",
  uid,
  isLiked,
}: Props) => {
  const [isReply, setIsReply] = useState(false);
  const user = useAppSelector((state) => state.user);
  const [replyComments, setReplyComments] = useState<{
    message: string;
    list: IComment[];
  } | null>(null);
  const [showReply, setShowReply] = useState({
    isShow: false,
    cursor: 0,
  });
  const [likedCommentInComments, setLikedCommentInComments] = useState<{
    message: string;
    list: ILikedComment[];
  } | null>(null);
  useEffect(() => {
    const fetchComment = async () => {
      const commentRes = await getData<{
        message: string;
        list: IComment[];
      }>(servicesPath.GET_REPLY_OF_COMMENT, {
        video_id: video_id,
        reply_comment_id: comment_id,
        cursor: 0,
      }).catch(console.error);
      if (commentRes && commentRes.data) {
        setReplyComments(commentRes.data);
        const likedCommentInComments = await getData<{
          message: string;
          list: ILikedComment[];
        }>(
          servicesPath.GET_ALL_LIKED_COMMENT_IN_OTHER_COMMENT,
          {
            video_id: video_id,
            reply_comment_id: comment_id,
          },
          true
        ).catch(console.error);
        if (likedCommentInComments && likedCommentInComments.data) {
          setLikedCommentInComments(likedCommentInComments.data);
        }
      }
    };
    if (
      typeof replyCount === "number" &&
      replyCount > 0 &&
      video_id &&
      showReply.isShow
    ) {
      fetchComment();
    }
  }, [replyCount, showReply.isShow, video_id, comment_id]);
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
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
        reply_comment_id: comment_id,
        video_id: video_id,
        text: text,
      },
      true
    ).catch(console.error);
    if (commentRes && commentRes.data) {
      const newComment = commentRes.data.doc;
      setReplyComments((state) => {
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
  const onShowReply = () => {
    setShowReply((preState) => {
      return {
        ...preState,
        isShow: !preState.isShow,
      };
    });
  };
  const onLikeComment = async (
    event: MouseEvent<HTMLButtonElement>,
    like: boolean
  ) => {
    if (like) {
      const likeRes = await postData(
        servicesPath.POST_lIKED_COMMENT,
        {
          video_id: video_id,
          comment_id: comment_id,
        },
        true
      ).catch(console.error);
      likeRes && likeRes.data && console.log("commented");
    } else {
      const deleteRes = await deleteData<any>(servicesPath.DEL_lIKED_COMMENT, {
        video_id: video_id,
        comment_id: comment_id,
      }).catch(console.error);
      deleteRes && deleteRes.data && console.log("del comment successfully");
    }
  };

  return (
    <div className={`w-full h-auto text-white ${styleArray}`}>
      <div className="w-full flex justify-start items-start space-x-2 border-b border-darkslategray py-3">
        {/* User image */}
        <AvatarCardLink
          width="w-10"
          height="h-10"
          href={`user/${uid}`}
          image={image}
          firstNickNameCharacter={nickname[0]}
          title={nickname}
          hint={"Cover"}
        />
        {/* Content */}
        <div className="flex-1 flex-col justify-start items-start space-y-2">
          <div className="flex justify-start items-center space-x-2">
            <h4 className="text-inherit font-normal text-[13px] leading-5 opacity-70">
              {nickname}
            </h4>
            <span className="text-inherit font-normal text-xs leading-[21px] opacity-50">
              {convertDate(datePosted)}
            </span>
          </div>
          {/* Text msg */}
          <p className="text-sm text-inherit font-normal leading-6 opacity-90">
            {content}
          </p>
          {/* Action: Like, Reply */}
          <div className="text-xs font-medium leading-5 text-inherit opacity-70  flex justify-start items-center space-x-5">
            <Heart
              liked={isLiked}
              likedCount={likedCount}
              onClick={onLikeComment}
            />
            <button
              onClick={() => setIsReply(!isReply)}
              className="flex justify-start items-center space-x-px hover:text-fresh_red"
            >
              <svg
                width="20"
                height="20"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 17.617C6 11.561 11.578 7 18 7s12 4.561 12 10.617c0 3.036-1.51 5.529-3.749 7.728-.187.184-.381.364-.58.54-1.925 2.082-3.911 3.417-5.847 3.973-.77.221-1.702.242-2.454-.381-.68-.564-.837-1.361-.878-1.823a3.848 3.848 0 01-.01-.136C10.898 26.91 6 23.264 6 17.617zM18 10c-5.177 0-9 3.602-9 7.617 0 3.867 3.794 6.992 9.152 6.992h1.5v1.717l-.06.206c0-.001-.03.104-.06.259 1.155-.46 2.515-1.394 3.984-2.996l.056-.06.063-.055c.182-.16.353-.318.514-.475C26.075 21.312 27 19.543 27 17.617 27 13.602 23.177 10 18 10z"
                  fillOpacity="0.9"
                ></path>
              </svg>
              回复
            </button>
          </div>
          {isReply && user.data && <Input onSubmit={onSubmit} />}
          {/* View more reply */}
          {replyCount !== 0 && (
            <button
              onClick={onShowReply}
              className="flex justify-start items-center space-x-1 text-inherit font-normal opacity-50 text-xs leading-5"
            >
              <div className="space-x-1 text-gray-200 opacity-90">
                <span>展开</span>
                <span className="text-white text-sm">{replyCount}</span>
                <span>条回复</span>
              </div>
              <div>
                <svg
                  width="13"
                  height="13"
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 13 13"
                >
                  <path
                    opacity="0.6"
                    clipRule="evenodd"
                    d="M4.21 4h5.58c.28.322.28.844 0 1.166L7.506 7.759a.651.651 0 01-1.012 0L4.21 5.166A.915.915 0 014.21 4z"
                  ></path>
                </svg>
              </div>
            </button>
          )}
          {replyComments &&
            showReply.isShow &&
            replyComments.list.map((c, index) => {
              const isLiked = likedCommentInComments?.list.find((l) => {
                return l.comment_id._id === c._id;
              });
              console.log({ isLiked });
              return (
                <Comment
                  isLiked={isLiked ? true : false}
                  comment_id={c._id}
                  video_id={video_id}
                  nickname={c.author_id.nickname}
                  image={c.author_id.avatar_thumb.url_list[0]}
                  key={c._id}
                  styleArray={!true ? `px-3` : "px-0"}
                  uid={c.author_id.uid}
                  datePosted={c.createdAt}
                  content={c.text}
                  likedCount={c.like_count}
                  replyCount={c.reply_count}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
