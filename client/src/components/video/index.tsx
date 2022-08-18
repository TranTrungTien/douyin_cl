import { useEffect, useRef } from "react";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import RightVideoAction from "../../layouts/right_video_action_container";
import { RightBarAction } from "../../layouts/video_slide";
import { useAppDispatch } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import { toggleFullScreen } from "../../utils/fullscreen";
import { timeFormat } from "../../utils/timeFormat";
import AvatarCardButton from "../avatar_card_button";
import BottomVideoAction from "../bottom_video_action";
import LikeCmtShare from "../like_cmt_share_action";
import NextVideoButton from "../next_video_button";
import Plus from "../plus";
import ProgressBar from "../progress_bar";

type Props = {
  authorUid?: string;
  authorVideoID?: string;
  isFollow?: boolean;
  myID?: string;
  videoAddr: string;
  videoIdf: string;
  videoID: string;
  videoDesc: string;
  videoDuration: number;
  nickname: string;
  fromVideoPage: boolean;
  allowedPlay: boolean;
  isPlay: boolean;
  isLiked?: boolean;
  isActive: boolean;
  avatarThumb: string;
  onChangeVideo?: (action: boolean) => void;
  onOpenRightBar?: (action: RightBarAction) => void;
};

const Video = ({
  isFollow,
  authorVideoID,
  myID,
  authorUid,
  videoAddr,
  nickname,
  videoDesc,
  videoDuration,
  videoID,
  videoIdf,
  fromVideoPage,
  allowedPlay,
  isPlay,
  isLiked,
  isActive,
  avatarThumb,
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
  const videoBlob = useFetchSuspense<Blob>(
    "/" + videoAddr,
    null,
    false,
    "blob",
    "video/mp4"
  );
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
        (videoRef.current.currentTime / videoDuration) * 100;
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
      const changedTime = (progressBarPercentage / 100) * videoDuration;
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

  const handleFollow = async () => {
    if (myID && authorVideoID) {
      const followRes = await postData<any>(
        servicesPath.FOLLOW_USER,
        {
          follow_id: authorVideoID,
        },
        true
      ).catch(console.error);
      followRes && followRes.data && console.log("followed");
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
        authorUid={authorUid}
        handleToggleFullscreenMode={onToggleFullscreenMode}
        nickname={nickname}
        videoDesc={videoDesc}
        videoDuration={videoDuration}
        videoID={videoID}
        videoIdf={videoIdf}
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
            image={avatarThumb}
            borderRadius="rounded-full"
            handleOpenRightBar={onOpenRightBar}
            height="h-10"
            width="w-10"
            hint="User Cover"
          >
            {!isFollow && <Plus onClick={handleFollow} />}
          </AvatarCardButton>
          {/* like share, cmt,.,,, */}
          <LikeCmtShare
            authorVideoID={authorVideoID}
            videoId={videoID}
            myID={myID}
            liked={isLiked}
            onOpenRightBar={onOpenRightBar}
          />
        </RightVideoAction>
      )}
    </>
  );
};

export default Video;
