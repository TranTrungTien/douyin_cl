// @flow
import { memo, MouseEvent, Suspense, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { BackgroundVideo, Loading, Video } from "../../components";
import Modal from "../../components/modal";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { isFollowUser, useAppSelector } from "../../redux/app/hooks";
import ErrorBoundary from "../../utils/error-boundaries";
import CommentContainer from "../comment_container";
import RightContainer from "../right_container";
import UserContainer from "../user_container";

type Props = {
  avatarThumb: string;
  nickname: string;
  allowedPlay: boolean;
  searchPageData?: {
    isActive: boolean;
    isVisible: boolean;
    isNext: boolean;
    isPrev: boolean;
  };
  className?: string;
  video: IVideo;
  statistics?: IStatistics;
  onStart: () => void;
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
  searchPageData,
  className = "w-full h-full",
  onStart,
}: Props) => {
  console.log("video slide rerender");
  const myID = useAppSelector((state) => state.user.data?._id);
  const [isPlay, setIsPlay] = useState(true);
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
  console.log(video._id);
  const handleOpenRightBar = (action: RightBarAction) => {
    if (action.isOpen === openRightBar.isOpen) return;
    setOpenRightBar((pre) => {
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
      if (!allowedPlay) onStart();
      else setIsPlay((prev) => !prev);
    }
  };
  console.log({ isActive, isVisible, isPrev, isNext });

  const isFollow = useAppSelector((state) =>
    isFollowUser(state, myID, video.author_id._id)
  ) as boolean | undefined;

  return (
    <div
      className={`flex justify-between items-center rounded-md ${className}`}
    >
      <section
        onClick={handlePlayOrPause}
        className="w-full h-full flex-1 relative grid place-content-center overflow-hidden rounded-md z-0 bg-transparent"
      >
        <BackgroundVideo coverImage={video.origin_cover.url_list[0]} />
        {isVisible && (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary
              fallback={
                <Modal>
                  <div className="w-96 h-96 rounded bg-dark_blue text-center text-white flex justify-center items-center">
                    <h1>Opps we ran into some problems</h1>
                  </div>
                </Modal>
              }
            >
              {isActive && (
                <Video
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
                />
              )}
            </ErrorBoundary>
          </Suspense>
        )}
      </section>
      {openRightBar.isOpen && (
        <RightContainer>
          {openRightBar.user ? (
            <UserContainer
              myID={myID}
              isFollow={isFollow}
              uid={video.author_id.uid}
              authorVideoID={video.author_id._id}
              avatarThumb={avatarThumb}
              nickname={nickname}
              onCloseUserBox={handleOpenRightBar}
            />
          ) : (
            <CommentContainer
              videoID={video._id}
              onCloseComment={handleOpenRightBar}
            />
          )}
        </RightContainer>
      )}
    </div>
  );
};

export default memo(VideoSlide);
