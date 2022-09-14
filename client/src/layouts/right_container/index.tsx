import { UIEvent, useMemo, useState } from "react";
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
  onCloseContainer: (action: RightBarAction) => void;
  videoID: string;
};

const RightContainer = ({
  isOpenBox,
  authorVideoID,
  avatarThumb,
  nickname,
  onCloseContainer,
  isFollow,
  uid,
  isOpenComment,
  isOpenUser,
  myID,
  videoID,
}: Props) => {
  const [cursor, setCursor] = useState(0);
  const ownVideosParams = useMemo(() => {
    return {
      author_id: authorVideoID,
      cursor: cursor,
      limit: 15,
    };
  }, [authorVideoID, cursor]);
  const { data: ownVideos } = useFetchAppend<{
    video: IVideo;
    statistics: IStatistics;
  }>(
    servicesPath.GET_VIDEO_BY_USER,
    ownVideosParams,
    undefined,
    undefined,
    authorVideoID ? true : false
  );

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const toBottom =
      e.currentTarget.scrollHeight -
      e.currentTarget.scrollTop -
      e.currentTarget.clientHeight;
    if (toBottom <= 0) {
      setCursor((pre) => ++pre);
    }
  };

  const user = useAppSelector((state) => state.user);
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
    videoID ? true : false
  );

  const { data: likedComments } = useFetchAppend<ILikedComment>(
    servicesPath.GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR,
    commentParams,
    undefined,
    undefined,
    user.data?.uid ? true : false,
    true
  );

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
