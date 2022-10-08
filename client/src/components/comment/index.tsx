import {
  memo,
  MouseEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SmallHeartIcon from "../../assets/icons/small_heart_icon";
import { useFetchAppend } from "../../hooks/use_fetch_append";
import { MessageTransfer } from "../../hooks/use_message";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
import ReplyCommentContainer from "../../layouts/reply_comment_container";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { deleteData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import { convertDateToTime } from "../../utils/time";
import AvatarCardLink from "../avatar_card_link";
import Button from "../button";
import Heart from "../heart";
import Input from "../input";
import Loading from "../loading";

type Props = {
  nickname?: string;
  datePosted?: string;
  className?: string;
  content: string;
  image?: string;
  uid: string;
  likedCount?: number;
  replyCount?: number;
  videoID: string;
  commentID?: string;
  isLiked?: boolean;
  replyCommentID?: string;
};

const Comment = ({
  commentID,
  videoID,
  replyCount,
  likedCount,
  className,
  image,
  datePosted,
  content,
  nickname = "ღ᭄余生ꦿ࿐",
  uid,
  isLiked,
  replyCommentID,
}: Props) => {
  const [videoData, setVideoData] = useState({
    isLiked,
    likedCount,
    replyCount,
  });
  useEffect(() => {
    isLiked
      ? setVideoData((prev) => {
          return {
            ...prev,
            isLiked: true,
          };
        })
      : setVideoData((prev) => {
          return {
            ...prev,
            isLiked: false,
          };
        });
  }, [isLiked]);
  const messages = MessageTransfer();
  const dispatch = useAppDispatch();
  const [isReply, setIsReply] = useState(false);
  const user = useAppSelector((state) => state.user);
  const [showReply, setShowReply] = useState({
    isShow: false,
    allowFetching: false,
    isStarted: false,
    isEnded: false,
    cursor: 0,
  });

  const commentParams = useMemo(() => {
    return {
      video_id: videoID,
      reply_comment_id: commentID,
      cursor: 0,
    };
  }, [videoID, commentID]);
  const handleStopFetchReplyComment = useCallback(() => {
    setShowReply((prev) => ({ ...prev, isStarted: false, isEnded: true }));
  }, []);
  const { data: replyComments, setData: setReplyComments } =
    useFetchAppend<IComment>(
      servicesPath.GET_REPLY_OF_COMMENT,
      commentParams,
      undefined,
      undefined,
      typeof replyCount === "number" &&
        replyCount > 0 &&
        videoID &&
        showReply.allowFetching
        ? true
        : false,
      false,
      handleStopFetchReplyComment
    );
  const likedCommentInCommentsParams = useMemo(() => {
    return {
      video_id: videoID,
      reply_comment_id: commentID,
    };
  }, [videoID, commentID]);
  const { data: likedCommentInComments } = useFetchAppend<ILikedComment>(
    servicesPath.GET_ALL_LIKED_COMMENT_IN_OTHER_COMMENT,
    likedCommentInCommentsParams,
    undefined,
    undefined,
    user?.data?.uid && replyComments?.list.length ? true : false,
    true
  );

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      comment: {
        value: string;
      };
      reset: () => void;
    };
    const text = target.comment.value;
    target.reset();

    if (user.data) {
      const commentRes = await postData<{ message: string; data: IComment }>(
        servicesPath.POST_COMMENT,
        {
          reply_comment_id: commentID,
          video_id: videoID,
          text: text,
        },
        true
      ).catch((err) => {
        console.error(err);
        messages.sendMessage("Can't comment! Something went wrong", "danger");
      });
      setVideoData((prev) => {
        return {
          ...prev,
          replyCount: (prev?.replyCount || 0) + 1,
        };
      });
      if (commentRes && commentRes.data) {
        const newComment = commentRes.data.data;
        newComment.author_id = user.data;
        setShowReply((prev) => {
          return {
            ...prev,
            isShow: true,
          };
        });
        setReplyComments((state) => {
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
    } else dispatch(setIsLogin(true));
  };
  const handleShowReply = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowReply((prev) => {
      return {
        ...prev,
        isStarted: prev.allowFetching ? false : true,
        isEnded: false,
        allowFetching: true,
        isShow: !prev.isShow,
      };
    });
  };

  const handleLikeComment = async () => {
    if (user.data) {
      if (!videoData.isLiked) {
        setVideoData((prev) => {
          return {
            ...prev,
            likedCount: (prev?.likedCount || 0) + 1,
            isLiked: true,
          };
        });
        await postData(
          servicesPath.POST_lIKED_COMMENT,
          {
            video_id: videoID,
            comment_id: commentID,
            reply_comment_id: replyCommentID,
          },
          true
        ).catch((err) => {
          console.error(err);
          messages.sendMessage(
            "Can't like comment! Something went wrong",
            "danger"
          );
        });
      } else if (videoData.isLiked) {
        setVideoData((prev) => {
          return {
            ...prev,
            likedCount: (prev?.likedCount || 0) - 1,
            isLiked: false,
          };
        });
        await deleteData<any>(servicesPath.DEL_lIKED_COMMENT, {
          video_id: videoID,
          comment_id: commentID,
        }).catch((err) => {
          console.error(err);
          messages.sendMessage("Can't comment! Something went wrong", "danger");
        });
      }
    } else dispatch(setIsLogin(true));
  };

  const handleReplyComment = () => {
    if (user.data) setIsReply(!isReply);
    else dispatch(setIsLogin(true));
  };

  return (
    <div className={`w-full h-auto text-white ${className}`}>
      <div className="w-full flex justify-start items-start space-x-2 border-b border-darkslategray py-3">
        {/* User image */}
        <AvatarCardLink
          width="w-10"
          height="h-10"
          href={`user/${uid}`}
          image={image}
          firstNickNameCharacter={nickname[0]}
          title={nickname}
          hint={nickname}
        />
        {/* Content */}
        <div className="flex-1 flex-col justify-start items-start space-y-2">
          <div className="flex justify-start items-center space-x-2">
            <h4 className="text-inherit font-normal text-[13px] leading-5 opacity-70">
              {nickname}
            </h4>
            <span className="text-inherit font-normal text-xs leading-[21px] opacity-50">
              {convertDateToTime(datePosted)}
            </span>
          </div>
          {/* Text msg */}
          <p className="text-sm text-inherit font-normal leading-6 opacity-90">
            {content}
          </p>
          {/* Action: Like, Reply */}
          <div className="text-xs font-medium leading-5 text-inherit opacity-70  flex justify-start items-center space-x-5">
            <Heart
              icon={<SmallHeartIcon />}
              isLiked={videoData.isLiked}
              likedCount={videoData.likedCount}
              onClick={handleLikeComment}
            />
            <Button
              text=""
              onClick={handleReplyComment}
              className="flex justify-start items-center space-x-px hover:text-fresh_red"
              icon={
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
              }
            >
              <span>回复</span>
            </Button>
          </div>
          {isReply && user.data && (
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Input
                className="bg-transparent"
                placeholder="评论 ..."
                type="text"
                autoComplete="off"
                id="comment"
                name="comment"
              />
            </form>
          )}
          {/* View more reply */}
          {replyCount !== 0 && (
            <Button
              text=""
              onClick={handleShowReply}
              className="flex justify-start items-center space-x-1 text-inherit font-normal opacity-50 text-xs leading-5 relative"
              icon={
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
              }
            >
              <div className="space-x-1 text-gray-200 opacity-90 text-sm">
                <span>展开</span>
                <span className="text-white text-sm">
                  {videoData.replyCount}
                </span>
                <span>条回复</span>
              </div>
              {showReply.isStarted && !showReply.isEnded && <Loading />}
            </Button>
          )}
          {replyComments && showReply.isShow && (
            <ReplyCommentContainer
              likedCommentInComments={likedCommentInComments?.list}
              replyComments={replyComments.list}
              videoID={videoID}
              isShow={showReply.isShow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
