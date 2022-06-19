// @flow
import { memo, MouseEvent, Suspense, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { Node } from "typescript";
import { Loading } from "../../components";
import Video from "../../components/finalvideo";
import CommentContainer from "../commentcontainer";
import RightContainer from "../rightcontainer";
import UserContainer from "../usercontainer";

type Props = {
  video: {
    author: string;
    desc: string;
    link: string;
    local_link: string;
  };
  allowedPlay: boolean;
};
export interface RightBarAction {
  isOpen: boolean;
  comment: boolean;
  user: boolean;
}
const dataType = "clickable";
const VideoSlide = ({ video, allowedPlay }: Props) => {
  console.log("video slide rerender");
  const [isPlay, setIsPlay] = useState(true);
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();
  const [openRightBar, setOpenRightBar] = useState<RightBarAction>({
    isOpen: false,
    comment: false,
    user: false,
  });

  const { isActive, isNext, isPrev, isVisible } = swiperSlide;

  const onOpenRightBar = (action: RightBarAction) => {
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
  return (
    <div className="flex justify-between items-center w-full h-full rounded-md">
      {isVisible && (
        <Suspense fallback={<Loading />}>
          <section
            onClick={onPlayOrPause}
            data-type="clickable"
            className="w-full h-full flex-1 relative grid place-content-center overflow-hidden rounded-md"
          >
            <div
              className="z-[-1] absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gradient-to-r from-darkslategray2 to-darkslategray3 blur-xl rounded-md"
              style={{
                backgroundImage:
                  "url(https://i2-prod.cheshire-live.co.uk/incoming/article19274328.ece/ALTERNATES/s1227b/0_Ryan-Mottrams-picture-of-Middlewich.jpg)",
              }}
            ></div>
            <Video
              fromVideoPage={false}
              allowedPlay={allowedPlay}
              video={video}
              isPlay={isPlay}
              isActive={isActive}
              onChangeVideo={onChangeVideo}
              onOpenRightBar={onOpenRightBar}
            />
          </section>
          {openRightBar.isOpen && (
            <RightContainer>
              {openRightBar.user ? (
                <UserContainer handleCloseUserBox={onOpenRightBar} />
              ) : (
                <CommentContainer handleCloseComment={onOpenRightBar} />
              )}
            </RightContainer>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default memo(VideoSlide);

// {
//   /* Video */
// }
// <video
//   ref={videoRef}
//   data-type="clickable"
//   className="max-h-full w-auto h-auto object-contain object-center rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
//   src="/download.mp4"
//   loop={isActive && true}
//   autoPlay={isActive && true}
//   muted={true}
//   onTimeUpdate={onTimeUpdate}
// ></video>;
// {
//   /* Pause when clicking */
// }
// {
//   !isPlay && (
//     <button className="absolute top-1/2 left-1/2 text-white opacity-70 transform -translate-x-1/2 -translate-y-1/2">
//       <svg
//         width="100"
//         height="100"
//         className="fill-current"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 39 39"
//       >
//         <path d="M10 10.693c0-1.7 0-2.549.354-3.013A1.729 1.729 0 0111.64 7c.582-.03 1.284.45 2.687 1.409l9.697 6.63c1.097.75 1.646 1.126 1.843 1.598.172.414.177.878.014 1.296-.187.476-.727.863-1.808 1.638l-9.697 6.945c-1.413 1.013-2.12 1.52-2.71 1.498a1.728 1.728 0 01-1.305-.67C10 26.877 10 26.007 10 24.268V10.693z"></path>
//       </svg>
//     </button>
//   );
// }
// {
//   /* Action's video */
// }
// <BottomVideoAction
//   isPlay={isPlay}
//   progressBar={<ProgressBar ref={progressBarRef} />}
// />;
// {
//   /* Like, share, subscribe action, ect,..., */
// }
// <RightVideoAction>
//   {/* next, pre button */}
//   <NextVideoButton handleChangeVideo={onChangeVideo} />
//   <AvatarCardButton
//     image="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
//     borderRadius="rounded-full"
//     handleOpenRightBar={onOpenRightBar}
//     height="h-10"
//     width="w-10"
//     hint="User Cover"
//   >
//     <Plus />
//   </AvatarCardButton>
//   {/* like share, cmt,.,,, */}
//   <LikeCmtShare onOpenRightBar={onOpenRightBar} />
// </RightVideoAction>;
