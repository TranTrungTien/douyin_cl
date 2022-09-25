import { UIEvent, useEffect, useMemo, useState } from "react";
import { useFetchAppend } from "../../hooks/use_fetch_append";
import { IComment } from "../../interfaces/comment";
import { ILikedComment } from "../../interfaces/liked_video.interface";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import { servicesPath } from "../../services/services_path";
import CommentContainer from "../comment_container";
import UserContainer from "../user_container";
import { RightBarAction } from "../video_slide";

type Props = {
  isOpenBox: boolean;
  isOpenUser: boolean;
  isOpenComment: boolean;
  myID: string;
  isFollow: boolean;
  uid: string;
  authorVideoID: string;
  avatarThumb: string;
  nickname: string;
  videoID: string;
  onCloseContainer: (action: RightBarAction) => void;
};

const RightContainer = ({
  isOpenBox,
  authorVideoID,
  avatarThumb,
  nickname,
  isFollow,
  uid,
  isOpenComment,
  isOpenUser,
  myID,
  videoID,
  onCloseContainer,
}: Props) => {
  const [cursor, setCursor] = useState({
    video: {
      cursor: 0,
      isCurrent: false,
    },
    comment: {
      cursor: 0,
      isCurrent: false,
    },
  });
  const user = useAppSelector((state) => state.user);
  const [allowFetching, setAllowFetching] = useState({
    video: {
      isFirstTime: true,
      allowFetching: false,
    },
    comment: {
      isFirstTime: true,
      allowFetching: false,
    },
  });

  useEffect(() => {
    if (cursor.video.cursor === 0 && isOpenBox) {
      if (isOpenUser) {
        setAllowFetching((prev) => {
          return {
            ...prev,
            video: prev.video.isFirstTime
              ? {
                  ...prev.video,
                  isFirstTime: false,
                  allowFetching: true,
                }
              : prev.video,
          };
        });
      } else if (isOpenComment) {
        setAllowFetching((prev) => {
          return {
            ...prev,
            comment: prev.comment.isFirstTime
              ? {
                  ...prev.comment,
                  isFirstTime: false,
                  allowFetching: true,
                }
              : prev.comment,
          };
        });
      }
    }
  }, [
    isOpenBox,
    isOpenUser,
    isOpenComment,
    cursor.comment.cursor,
    cursor.video.cursor,
  ]);
  useEffect(() => {
    if (isOpenBox) {
      if (isOpenUser) {
        setCursor((prev) => {
          return {
            ...prev,
            video: !prev.video.isCurrent
              ? {
                  ...prev.video,
                  isCurrent: true,
                }
              : prev.video,
            comment: prev.comment.isCurrent
              ? {
                  ...prev.comment,
                  isCurrent: false,
                }
              : prev.comment,
          };
        });
      } else {
        setCursor((prev) => {
          return {
            ...prev,
            comment: !prev.comment.isCurrent
              ? {
                  ...prev.comment,
                  isCurrent: true,
                }
              : prev.comment,
            video: prev.video.isCurrent
              ? {
                  ...prev.video,
                  isCurrent: false,
                }
              : prev.comment,
          };
        });
      }
    }
  }, [isOpenBox, isOpenUser, isOpenComment]);
  const ownVideosParams = useMemo(() => {
    return {
      author_id: authorVideoID,
      cursor: cursor.video.cursor,
      limit: 15,
    };
  }, [authorVideoID, cursor.video.cursor]);

  const { data: ownVideos } = useFetchAppend<{
    video: IVideo;
    statistics: IStatistics;
  }>(
    servicesPath.GET_VIDEO_BY_USER,
    ownVideosParams,
    undefined,
    undefined,
    authorVideoID && allowFetching.video.allowFetching ? true : false
  );

  const commentParams = useMemo(() => {
    return {
      video_id: videoID,
    };
  }, [videoID]);
  const { data: comments, setData: setComments } = useFetchAppend<IComment>(
    servicesPath.GET_ALL_COMMENTS_OF_VIDEO,
    commentParams,
    undefined,
    undefined,
    videoID && allowFetching.comment.allowFetching ? true : false
  );

  const { data: likedComments } = useFetchAppend<ILikedComment>(
    servicesPath.GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR,
    commentParams,
    undefined,
    undefined,
    user.data?.uid && videoID && allowFetching.comment.allowFetching
      ? true
      : false,
    true
  );
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const toBottom =
      e.currentTarget.scrollHeight -
      e.currentTarget.scrollTop -
      e.currentTarget.clientHeight;
    if (toBottom <= 0) {
      if (cursor.video.isCurrent) {
        setCursor((prev) => {
          return {
            ...prev,
            video: { ...prev.video, cursor: prev.video.cursor + 1 },
          };
        });
      } else if (cursor.comment.isCurrent) {
        setCursor((prev) => {
          return {
            ...prev,
            comment: { ...prev.comment, cursor: prev.comment.cursor + 1 },
          };
        });
      }
    }
  };
  return isOpenBox ? (
    <section className="laptop:w-[30%] h-full bg-darkslategray3 rounded-md overflow-hidden">
      <div className="flex flex-col justify-start items-start w-full h-full overflow-hidden">
        {isOpenUser ? (
          <UserContainer
            myID={myID}
            isFollow={isFollow}
            uid={uid}
            authorVideoID={authorVideoID}
            avatarThumb={avatarThumb}
            nickname={nickname}
            onScroll={handleScroll}
            videosData={ownVideos}
            onCloseUserBox={onCloseContainer}
          />
        ) : isOpenComment ? (
          <CommentContainer
            videoID={videoID}
            user={user.data}
            fromVideoPage={false}
            likedComments={likedComments}
            comments={comments}
            commentsCount={comments?.list.length}
            setComments={setComments}
            onCloseComment={onCloseContainer}
          />
        ) : null}
      </div>
    </section>
  ) : null;
};

export default RightContainer;
