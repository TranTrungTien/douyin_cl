import { useEffect, useRef } from "react";
import { RightBarAction } from "../../layouts/videoslide";
import { timeFormat } from "../../utils/timeFormat";
import AvatarCardButton from "../avatarcardbutton";
import BottomVideoAction from "../bottomvideoaction";
import LikeCmtShare from "../likecmtshareaction";
import NextVideoButton from "../nextvideobutton";
import Plus from "../plus";
import ProgressBar from "../progressbar";
import RightVideoAction from "../rightvideoaction";

type Props = {
  video: {
    desc: string;
    link: string;
    local_link: string;
    author: string;
  };
  fromVideoPage: boolean;
  allowedPlay: boolean;
  isPlay: boolean;
  isActive: boolean;
  onChangeVideo: (action: boolean) => void;
  onOpenRightBar?: (action: RightBarAction) => void;
};

const Video = ({
  fromVideoPage,
  allowedPlay,
  video,
  isPlay,
  isActive,
  onChangeVideo,
  onOpenRightBar,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log("video rerender");

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeCounterRef = useRef<HTMLSpanElement>(null);
  const progressContainerRef = useRef({ progressRef, progressBarRef });
  useEffect(() => {
    if (isPlay && isActive && allowedPlay && videoRef.current?.paused) {
      videoRef.current.play();
    } else if (
      !isPlay &&
      isActive &&
      allowedPlay &&
      !videoRef.current?.paused
    ) {
      videoRef.current?.pause();
    }
  }, [isPlay, isActive, allowedPlay]);

  useEffect(() => {
    videoRef.current &&
      (videoRef.current.volume = Number(localStorage.getItem("volume")) ?? 0);
  }, []);
  const onTimeUpdate = () => {
    if (videoRef.current && progressBarRef.current && progressRef.current) {
      const currentTimePercent = (videoRef.current.currentTime / 31) * 100;
      const width =
        (progressBarRef.current.clientWidth / 100) * currentTimePercent;
      if (width > progressBarRef.current.clientWidth) {
        progressRef.current.style.width =
          progressBarRef.current.clientWidth + "px";
      } else progressRef.current.style.width = width + "px";
    }
    timeCounterRef.current &&
      (timeCounterRef.current.textContent = timeFormat(
        videoRef.current?.currentTime ?? 0
      ));
  };
  const onTurnOnOffVolume = (turnOff: boolean) => {
    if (!videoRef.current) {
      return;
    } else {
      if (turnOff) {
        videoRef.current.muted = true;
        localStorage.setItem("volume", "0");
        videoRef.current.volume = 0.0;
      } else {
        videoRef.current.muted = false;
        videoRef.current.volume = Number(localStorage.getItem("volume")) ?? 0;
      }
    }
  };
  const onChangeVideoTime = (position: number) => {
    if (progressBarRef.current && videoRef.current) {
      const progressBarPercentage =
        (position / progressBarRef.current.clientWidth) * 100;
      const changedTime = (progressBarPercentage / 100) * 31;
      videoRef.current.currentTime = changedTime;
    }
  };
  return (
    <>
      {/* Video */}
      <video
        ref={videoRef}
        data-type="clickable"
        playsInline
        className="max-h-full w-auto h-auto object-contain object-center rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
        src={
          isActive
            ? "http://localhost:3001/api/v1/media/get-video?link=" +
              video.local_link
            : undefined
        }
        loop={isActive && true}
        autoPlay={isActive && allowedPlay}
        onTimeUpdate={onTimeUpdate}
      ></video>
      {/* Pause when clicking */}
      {!isPlay && (
        <button
          data-type="center_play_clickable"
          className="absolute top-1/2 left-1/2 text-white opacity-70 transform -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            width="100"
            height="100"
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 39 39"
          >
            <path d="M10 10.693c0-1.7 0-2.549.354-3.013A1.729 1.729 0 0111.64 7c.582-.03 1.284.45 2.687 1.409l9.697 6.63c1.097.75 1.646 1.126 1.843 1.598.172.414.177.878.014 1.296-.187.476-.727.863-1.808 1.638l-9.697 6.945c-1.413 1.013-2.12 1.52-2.71 1.498a1.728 1.728 0 01-1.305-.67C10 26.877 10 26.007 10 24.268V10.693z"></path>
          </svg>
        </button>
      )}
      {/* Action's video */}
      <BottomVideoAction
        metaData={{ author: video.author, desc: video.desc }}
        ref={timeCounterRef}
        isPlay={isPlay}
        progressBar={
          <ProgressBar
            handleChangeVideoTime={onChangeVideoTime}
            ref={progressContainerRef}
          />
        }
        turnOnOffVolume={onTurnOnOffVolume}
      />
      {/* Like, share, subscribe action, ect,..., */}
      {!fromVideoPage && onOpenRightBar && (
        <RightVideoAction>
          {/* next, pre button */}
          <NextVideoButton handleChangeVideo={onChangeVideo} />
          <AvatarCardButton
            image="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
            borderRadius="rounded-full"
            handleOpenRightBar={onOpenRightBar}
            height="h-10"
            width="w-10"
            hint="User Cover"
          >
            <Plus />
          </AvatarCardButton>
          {/* like share, cmt,.,,, */}
          <LikeCmtShare onOpenRightBar={onOpenRightBar} />
        </RightVideoAction>
      )}
    </>
  );
};

export default Video;
