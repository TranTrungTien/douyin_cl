import axios from "axios";
import { useEffect, useMemo, useRef } from "react";
import { servicesPath } from "../../config/app_config";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import RightVideoAction from "../../layouts/right_video_action_container";
import { RightBarAction } from "../../layouts/video_slide";
import { useAppDispatch } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { toggleFullScreen } from "../../utils/fullscreen";
import { timeFormat } from "../../utils/timeFormat";
import AvatarCardButton from "../avatar_card_button";
import BottomVideoAction from "../bottom_video_action";
import LikeCmtShare from "../like_cmt_share_action";
import NextVideoButton from "../next_video_button";
import Plus from "../plus";
import ProgressBar from "../progress_bar";

//  useMemo(() => {
//    return axiosConfigHeaders(
//      "blob",
//      "application/json",
//      "application/json",
//      null
//    );
//  }, []);

type Props = {
  author_uid?: string;
  author_id?: string;
  isFollow?: boolean;
  my_id?: string;
  video_addr: string;
  video_idf: string;
  video_id: string;
  video_desc: string;
  video_duration: number;
  nickname: string;
  fromVideoPage: boolean;
  allowedPlay: boolean;
  isPlay: boolean;
  isActive: boolean;
  avatar_thumb: string;
  onChangeVideo: (action: boolean) => void;
  onOpenRightBar?: (action: RightBarAction) => void;
};

const Video = ({
  isFollow,
  author_id,
  my_id,
  author_uid,
  video_addr,
  nickname,
  video_desc,
  video_duration,
  video_id,
  video_idf,
  fromVideoPage,
  allowedPlay,
  isPlay,
  isActive,
  avatar_thumb,
  onChangeVideo,
  onOpenRightBar,
}: Props) => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log("video rerender");
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeCounterRef = useRef<HTMLSpanElement>(null);
  const progressContainerRef = useRef({ progressRef, progressBarRef });
  const mediaHeader = useMemo(() => {
    return axiosConfigHeaders("GET", "blob", "video/mp4", "video/mp4", null);
  }, []);
  const videoBlob = useFetchSuspense<Blob>("/" + video_addr, mediaHeader);

  useEffect(() => {
    let videoRefCl: HTMLVideoElement | null = null;
    if (videoBlob && videoRef.current && !videoRef.current.src) {
      videoRefCl = videoRef.current;
      videoRef.current.src = window.URL.createObjectURL(videoBlob);
    }
    return () => {
      videoRefCl && window.URL.revokeObjectURL(videoRefCl.src);
    };
  }, [videoBlob]);
  useEffect(() => {
    if (
      isPlay &&
      isActive &&
      allowedPlay &&
      videoRef.current &&
      videoRef.current.paused
    ) {
      videoRef.current.play();
    } else if (
      !isPlay &&
      isActive &&
      allowedPlay &&
      videoRef.current &&
      !videoRef.current.paused
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
      const currentTimePercent =
        (videoRef.current.currentTime / video_duration) * 100;
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
      const changedTime = (progressBarPercentage / 100) * video_duration;
      videoRef.current.currentTime = changedTime;
    }
  };
  const onChangeVolume = (volume: number) => {
    console.log(volume);
    videoRef.current && (videoRef.current.volume = volume);
    localStorage.setItem("volume", JSON.stringify(volume));
  };

  const onToggleFullscreenMode = () => {
    const player = document.querySelector("#fullscreen") as HTMLElement;
    toggleFullScreen(player);
  };

  const handleFollow = () => {
    if (my_id && author_id) {
      axios
        .post(
          servicesPath.FOLLOW_USER,
          {
            follow_id: author_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then()
        .catch(alert);
    } else {
      dispatch(setIsLogin(true));
    }
  };
  return (
    <>
      {/* Video */}
      <video
        id="video"
        ref={videoRef}
        data-type="clickable"
        playsInline
        className="max-h-full min-h-full h-full w-auto  object-contain object-center rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
        loop={isActive && true}
        autoPlay={isActive && allowedPlay}
        onTimeUpdate={onTimeUpdate}
      ></video>
      {/* Pause when clicking */}
      {(!isPlay || !allowedPlay) && (
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
        author_uid={author_uid}
        handleToggleFullscreenMode={onToggleFullscreenMode}
        nickname={nickname}
        video_desc={video_desc}
        video_duration={video_duration}
        video_id={video_id}
        video_idf={video_idf}
        handleChangeVolume={onChangeVolume}
        fromVideoPage={fromVideoPage}
        allowedPlay={allowedPlay}
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
            firstNickNameCharacter={nickname[0]}
            image={avatar_thumb}
            borderRadius="rounded-full"
            handleOpenRightBar={onOpenRightBar}
            height="h-10"
            width="w-10"
            hint="User Cover"
          >
            {!isFollow && <Plus onClick={handleFollow} />}
          </AvatarCardButton>
          {/* like share, cmt,.,,, */}
          <LikeCmtShare video_id={video_id} onOpenRightBar={onOpenRightBar} />
        </RightVideoAction>
      )}
    </>
  );
};

export default Video;
