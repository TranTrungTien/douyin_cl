// @flow
import { memo, MouseEvent, Suspense, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { BackgroundVideo, Loading, Video } from "../../components";
import Modal from "../../components/modal";
import { IVideo } from "../../interfaces/video.interface";
import { isFollowUser, useAppSelector } from "../../redux/app/hooks";
import ErrorBoundary from "../../utils/error-boundaries";
import CommentContainer from "../comment_container";
import RightContainer from "../right_container";
import UserContainer from "../user_container";

type Props = {
  avatar_thumb: string;
  nickname: string;
  video: IVideo;
  onStart: () => void;
  allowedPlay: boolean;
};
export interface RightBarAction {
  isOpen: boolean;
  comment: boolean;
  user: boolean;
}
const dataType = "clickable";
const VideoSlide = ({
  avatar_thumb,
  nickname,
  onStart,
  video,
  allowedPlay,
}: Props) => {
  console.log("video slide rerender");
  const myID = useAppSelector((state) => state.user.data?._id);
  console.log({ myID });
  const [isPlay, setIsPlay] = useState(true);
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();
  const [openRightBar, setOpenRightBar] = useState<RightBarAction>({
    isOpen: false,
    comment: false,
    user: false,
  });

  const { isActive, isVisible, isNext, isPrev } = swiperSlide;

  const onOpenRightBar = (action: RightBarAction) => {
    console.log({ action });

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
  const onChangeVideo = (isNextAction: boolean) => {
    console.log({ isNextAction });

    if (isNextAction) {
      swiper.slideNext(300);
    } else {
      swiper.slidePrev(300);
    }
  };

  const onPlayOrPause = (
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
      else setIsPlay((pre) => !pre);
    }
  };
  console.log({ isActive, isVisible, isPrev, isNext });

  const isFollow = useAppSelector((state) =>
    isFollowUser(state, myID, video.author_id._id)
  ) as boolean | undefined;

  return (
    <div className="flex justify-between items-center w-full h-full rounded-md">
      <section
        onClick={onPlayOrPause}
        data-type="clickable"
        className="w-full h-full flex-1 relative grid place-content-center overflow-hidden rounded-md"
      >
        <BackgroundVideo cover_url={video.origin_cover.url_list[0]} />
        {isVisible && (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary
              fallback={
                <Modal>
                  <div className="w-96 h-96 rounded bg-white text-center text-black">
                    <h1>Opps we ran into some problems</h1>
                  </div>
                </Modal>
              }
            >
              <Video
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
                avatarThumb={avatar_thumb}
                fromVideoPage={false}
                allowedPlay={allowedPlay}
                isPlay={isPlay}
                isActive={isActive}
                onChangeVideo={onChangeVideo}
                onOpenRightBar={onOpenRightBar}
              />
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
              user_id={video.author_id._id}
              author_id={video.author_id._id}
              avatar_thumb={avatar_thumb}
              nickname={nickname}
              handleCloseUserBox={onOpenRightBar}
            />
          ) : (
            <CommentContainer
              videoID={video._id}
              handleCloseComment={onOpenRightBar}
            />
          )}
        </RightContainer>
      )}
    </div>
  );
};

export default memo(VideoSlide);
