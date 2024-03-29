// @flow
import { memo, MouseEvent, Suspense, useEffect, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { BackgroundVideo, Loading, Video } from "../../components";
import ErrorCard from "../../components/error_card";
import Modal from "../../components/modal";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { ISearchPapeData } from "../../pages/search_page";
import { isFollowUser, useAppSelector } from "../../redux/app/hooks";
import ErrorBoundary from "../../utils/error-boundaries";
import RightContainer from "../right_container";

type Props = {
  index?: number;
  avatarThumb: string;
  nickname: string;
  allowedPlay: boolean;
  className?: string;
  playerId: string;
  searchPageData?: ISearchPapeData;
  video: IVideo;
  statistics?: IStatistics;
  onStart?: () => void;
};
export interface RightBarAction {
  isOpen: boolean;
  comment: boolean;
  user: boolean;
}
const dataType = "clickable";
const VideoSlide = ({
  avatarThumb,
  statistics,
  nickname,
  video,
  allowedPlay,
  playerId,
  index,
  searchPageData,
  className = "w-full h-full",
  onStart,
}: Props) => {
  console.log("video slide rerender");
  const myID = useAppSelector((state) => state.user.data?._id);
  const [isPlay, setIsPlay] = useState(false);
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();
  const [openRightBar, setOpenRightBar] = useState<RightBarAction>({
    isOpen: false,
    comment: false,
    user: false,
  });
  const { isActive, isVisible, isNext, isPrev } = searchPageData
    ? searchPageData
    : swiperSlide;
  useEffect(() => {
    allowedPlay && setIsPlay((_) => isActive);
  }, [isActive, allowedPlay]);
  const handleOpenRightBar = (action: RightBarAction) => {
    if (action.isOpen === openRightBar.isOpen) return;
    setOpenRightBar((_) => {
      const newState = {
        isOpen: action.isOpen,
        comment: action.comment,
        user: action.user,
      };
      return newState;
    });
  };
  const handleChangeVideo = (isNextAction: boolean) => {
    if (isNextAction) {
      swiper.slideNext(300);
    } else {
      swiper.slidePrev(300);
    }
  };

  const handlePlayOrPause = (
    e: MouseEvent<HTMLElement> & {
      target: {
        dataset: { type: string };
        closest: (node: any) => Node;
        tagName: string;
      };
    }
  ) => {
    if (!isActive) return;
    else if (
      e.target.dataset.type !== dataType &&
      !e.target.closest("[data-type='bottom_play_clickable']") &&
      !e.target.closest("[data-type='center_play_clickable']")
    )
      return;
    else {
      if (!allowedPlay && onStart) onStart();
      else setIsPlay((prev) => !prev);
    }
  };
  console.log({ index, isActive, isVisible, isPrev, isNext });

  const isFollow = useAppSelector((state) =>
    isFollowUser(state, myID, video.author_id._id, myID !== video.author_id._id)
  ) as boolean | undefined;
  const handleOpenVideoDetail = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div
      className={`flex justify-between items-center rounded-md ${className}`}
    >
      <section
        onClick={handlePlayOrPause}
        id="video_lazyload_root"
        className="w-full h-full min-h-full flex-1 relative grid place-content-center overflow-hidden rounded-md z-20 bg-transparent"
      >
        <BackgroundVideo coverImage={video.origin_cover.url_list[0]} />
        <Suspense fallback={<Loading />}>
          <ErrorBoundary
            fallback={
              <Modal root="video_lazyload_root">
                <ErrorCard />
              </Modal>
            }
          >
            <Video
              index={index}
              playerId={playerId}
              statistics={statistics}
              myID={myID}
              isFollow={isFollow}
              authorVideoID={video.author_id._id}
              authorUid={video.author_id.uid}
              nickname={video.author_id.nickname}
              videoAddr={video.play_addr.url_list[0]}
              videoDesc={video.desc}
              videoDuration={video.duration}
              videoID={video._id}
              videoIdf={video.id_f}
              avatarThumb={avatarThumb}
              fromVideoPage={false}
              allowedPlay={allowedPlay}
              isPlay={isPlay}
              isActive={isActive}
              onChangeVideo={handleChangeVideo}
              onOpenRightBar={handleOpenRightBar}
              fromSearchPage={searchPageData ? true : false}
              videoSize={{
                width: video.width,
                height: video.height,
              }}
              onOpenVideoDetail={handleOpenVideoDetail}
            />
          </ErrorBoundary>
        </Suspense>
      </section>
      <RightContainer
        isOpenBox={openRightBar.isOpen}
        uid={video.author_id.uid}
        authorVideoID={video.author_id._id}
        avatarThumb={avatarThumb}
        nickname={nickname}
        onCloseContainer={handleOpenRightBar}
        videoID={video._id}
        isFollow={isFollow ? true : false}
        isOpenComment={openRightBar.comment ? true : false}
        isOpenUser={openRightBar.user ? true : false}
        myID={myID ? myID : ""}
      />
    </div>
  );
};

export default memo(VideoSlide);
