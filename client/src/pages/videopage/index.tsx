import {
  MouseEvent,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  BackgroundVideo,
  Loading,
  Logo,
  Nav,
  Search,
  Video,
} from "../../components";
import Modal from "../../components/modal";
import { dataType } from "../../constants/type";
import {
  CommentContainer,
  HeaderContainer,
  LeftHeaderContainer,
  PageContainer,
  RelatedContainer,
  RelatedVideoContainer,
  SideContainer,
  VideoHeaderContainer,
} from "../../layouts";
import ErrorBoundary from "../../utils/error-boundaries";
import VideoPageUserBox from "../../components/video_page_user_box";
import { useFetch } from "../../hooks/use_fetch";
import { IVideo } from "../../interfaces/video.interface";
import { servicesPath } from "../../services/services_path";
import { useAppSelector } from "../../redux/app/hooks";
import { IStatistics } from "../../interfaces/statistic";
import { useFetchAppend } from "../../hooks/use_fetch_append";
import { ILikedComment } from "../../interfaces/liked_video.interface";
import { IComment } from "../../interfaces/comment";
import ErrorCard from "../../components/error_card";

type Props = {};

const VideoPage = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const [isPlay, setIsPlay] = useState(true);
  const { video_id: videoID, video_idf: videoIdf } = useParams();
  useEffect(() => {
    setIsPlay((prev) => {
      if (!prev) {
        return true;
      } else {
        return prev;
      }
    });
  }, [videoID, videoIdf]);
  const videoParams = useMemo(() => {
    return {
      video_id: videoID,
    };
  }, [videoID]);
  const video = useFetch<{ message: string; data: IVideo }>(
    servicesPath.GET_METADATA,
    videoParams,
    false,
    videoID ? true : false
  );

  const isLikedVideo = useFetch<{ message: string; like?: boolean }>(
    servicesPath.CHECK_LIKED,
    videoParams,
    true,
    videoID && user.data ? true : false
  );
  const statistics = useFetch<{ message: string; statistics: IStatistics }>(
    servicesPath.GET_STATISTICS_OF_VIDEO,
    videoParams,
    false,
    video?.data ? true : false
  );
  const handlePlayOrPause = (
    e: MouseEvent<HTMLElement> & {
      target: {
        dataset: { type: string };
        closest: (selector: any) => Node;
        tagName: string;
      };
    }
  ) => {
    if (
      e.target.dataset.type !== dataType &&
      !e.target.closest("[data-type='bottom_play_clickable']") &&
      !e.target.closest("[data-type='center_play_clickable']")
    )
      return;
    else {
      console.log("click");

      setIsPlay((pre) => !pre);
    }
  };
  const commentParams = useMemo(() => {
    return {
      video_id: videoID,
    };
  }, [videoID]);

  const prevVideoID = useRef(videoID);

  const { data: comments, setData: setComments } = useFetchAppend<IComment>(
    servicesPath.GET_ALL_COMMENTS_OF_VIDEO,
    commentParams,
    undefined,
    undefined,
    videoID ? true : false,
    false,
    undefined,
    "json",
    "application/json",
    !videoID,
    prevVideoID.current !== videoID
  );
  const { data: likedComments } = useFetchAppend<ILikedComment>(
    servicesPath.GET_ALL_LIKED_COMMENT_OF_VIDEO_BY_AUTHOR,
    commentParams,
    undefined,
    undefined,
    user.data?.uid ? true : false,
    true,
    undefined,
    "json",
    "application/json",
    !videoID
  );
  return (
    <section className="w-full h-screen">
      <div
        style={{ overflow: "overlay" }}
        className="w-full h-full bg-light_blue custom-scrollbar"
      >
        <HeaderContainer backgroundColor="bg-light_blue">
          <LeftHeaderContainer>
            <Logo />
            <Search />
          </LeftHeaderContainer>
          <Nav />
        </HeaderContainer>
        <PageContainer className="pt-6 ">
          <div className=" pb-16 laptop:w-full laptop:px-6 desktop:px-0 desktop:w-[1080px] extra-desktop:w-[1280px] over-desktop:w-[1440px] flex laptop:justify-start desktop:justify-center items-start mx-auto laptop:space-x-4">
            <SideContainer
              width="laptop:w-[75%] desktop:w-[860px] extra-desktop:w-[920px] over-desktop:w-[1000px]"
              height="h-full"
            >
              <section
                id="fullscreen"
                onClick={handlePlayOrPause}
                data-type="clickable"
                className="w-full laptop:h-[600px]  flex-1 relative grid place-content-center overflow-hidden rounded-md backdrop-blur-sm"
              >
                {video && (
                  <BackgroundVideo
                    coverImage={video.data.origin_cover.url_list[0]}
                  />
                )}
                <Suspense fallback={<Loading />}>
                  <ErrorBoundary
                    fallback={
                      <Modal>
                        <ErrorCard />
                      </Modal>
                    }
                  >
                    {video && (
                      <Video
                        playerId="fullscreen"
                        myID={user.data?._id}
                        nickname={video.data.author_id.nickname}
                        videoAddr={video.data.play_addr.url_list[0]}
                        videoDesc={video.data.desc}
                        videoDuration={video.data.duration}
                        videoID={video.data._id!}
                        videoIdf={video.data.id_f}
                        avatarThumb={
                          video.data.author_id.avatar_thumb.url_list[0]
                        }
                        fromVideoPage={true}
                        isActive={true}
                        isPlay={isPlay ? true : false}
                        allowedPlay={true}
                        videoSize={{
                          width: video.data.width,
                          height: video.data.height,
                        }}
                      />
                    )}
                  </ErrorBoundary>
                </Suspense>
              </section>

              <div className="flex flex-col justify-start items-start w-full">
                {video && (
                  <VideoHeaderContainer
                    statistics={statistics?.statistics}
                    authorVideoID={video.data.author_id._id}
                    myID={user.data?._id}
                    video={video.data}
                    isLiked={isLikedVideo ? isLikedVideo?.like : false}
                  />
                )}
                <div className="flex justify-start items-center space-x-1 mt-4 w-full">
                  <span className="text-sm font-normal leading-6 text-white opacity-50">
                    全部评论
                  </span>
                  <div className="w-full h-px bg-darkslategray flex-1"></div>
                </div>
                <div className="w-full mt-6">
                  {videoID && video?.data.allow_user_do.comment ? (
                    <CommentContainer
                      commentsCount={statistics?.statistics.comment_count}
                      videoID={videoID}
                      fromVideoPage={true}
                      comments={comments}
                      likedComments={likedComments}
                      user={user.data}
                      setComments={setComments}
                    />
                  ) : (
                    <p className="text-sm opacity-70 font-medium text-white text-center">
                      作者关闭了对该视频的评论
                    </p>
                  )}
                </div>
              </div>
            </SideContainer>
            <SideContainer className="flex-1">
              <RelatedContainer>
                {video && (
                  <VideoPageUserBox
                    followerCount={video.data.author_id.follower_count}
                    followingCount={video.data.author_id.following_count}
                    myID={user.data?._id}
                    user_id={video.data.author_id._id}
                    uid={video.data.author_id.uid}
                    imageLink={video.data.author_id.avatar_thumb.url_list[0]}
                    nickName={video.data.author_id.nickname}
                  />
                )}
                <div className="flex justify-start flex-col items-start text-white mt-10 relative min-w-full min-h-[calc(100vh/2)]">
                  <h4 className="text-[18px] opacity-90 font-medium leading-[26px]">
                    推荐视频
                  </h4>
                  {videoID && (
                    <Suspense fallback={<Loading />}>
                      <ErrorBoundary
                        fallback={
                          <Modal>
                            <ErrorCard />
                          </Modal>
                        }
                      >
                        {videoIdf && (
                          <RelatedVideoContainer
                            videoIdf={videoIdf}
                            userId={user.data?._id}
                          />
                        )}
                      </ErrorBoundary>
                    </Suspense>
                  )}
                </div>
              </RelatedContainer>
            </SideContainer>
          </div>
        </PageContainer>
      </div>
    </section>
  );
};

export default VideoPage;
