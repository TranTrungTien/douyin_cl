import { useCallback, useEffect, useMemo, useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { VideoSlide } from "..";
import { Loading } from "../../components";
import Modal from "../../components/modal";
import { IDs } from "../../constants/id";
import { useFetchAppend } from "../../hooks/use_fetch_append";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import { getData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import ErrorCard from "../../components/error_card";

SwiperCore.use([Virtual]);
const TRAINING_DELAY = 30000;

const SwiperWrapper = () => {
  const myID = useAppSelector((state) => state.user.data?._id);
  const [start, setStart] = useState(false);
  const handleStart = () => {
    if (!start) setStart(true);
  };
  const { data: recommendedDefault } = useFetchAppend<{
    video?: IVideo;
    statistics: IStatistics;
    w?: number;
  }>(
    servicesPath.GET_NEW_RECOMMENDED,
    undefined,
    undefined,
    undefined,
    myID ? false : true
  );
  const [reFetchVideoTrigger, setReFetchVideoTrigger] = useState<{
    allowedFetchVideo: boolean;
    hadSeenVideos: { [key: number]: string };
  }>({
    allowedFetchVideo: false,
    hadSeenVideos: {},
  });
  const videoParams = useMemo(() => {
    return {
      limit: 10,
      ...reFetchVideoTrigger.hadSeenVideos,
    };
  }, [reFetchVideoTrigger.hadSeenVideos]);
  const handleResponse = (
    list: {
      video?: IVideo | undefined;
      statistics: IStatistics;
      w?: number;
    }[]
  ) => {
    // localStorage.removeItem("had_seen");
    // const hadSeenVideos: { [key: number]: string } = {};
    // list.forEach((v, index) => {
    //   hadSeenVideos[index] = v.video?._id || "";
    // });
    // localStorage.setItem("had_seen", JSON.stringify(hadSeenVideos));
  };
  const responseHandler = useCallback(handleResponse, []);
  const { data: recommendedForUser } = useFetchAppend<{
    video?: IVideo;
    statistics: IStatistics;
    w?: number;
  }>(
    servicesPath.GET_RECOMMENDED_BASED_ON_USER,
    videoParams,
    undefined,
    undefined,
    myID && reFetchVideoTrigger.allowedFetchVideo ? true : false,
    true,
    responseHandler
  );
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (myID) {
      const handleTraining = () => {
        if (!myID) {
          clearInterval(intervalId);
          return;
        }
        getData<{ message: string }>(
          servicesPath.RECOMMENDATION_TRAINING,
          undefined,
          true
        ).then((res) => {
          if (res.data) {
            setReFetchVideoTrigger((prev) => {
              if (!prev.allowedFetchVideo) {
                return {
                  ...prev,
                  allowedFetchVideo: true,
                };
              } else return prev;
            });
          }
        });
      };
      handleTraining();
      intervalId = setInterval(handleTraining, TRAINING_DELAY);
    }
    return () => clearInterval(intervalId);
  }, [myID]);

  const videos = myID ? recommendedForUser : recommendedDefault;
  const handleSlideChange = (swiper: SwiperCore) => {
    if (myID && videos) {
      if (videos.list.length - swiper.activeIndex === 2) {
        const rawData = localStorage.getItem("had_seen") || "";
        if (rawData) {
          const hadSeenVideos = JSON.parse(rawData);
          if (hadSeenVideos) {
            setReFetchVideoTrigger((prev) => {
              return {
                ...prev,
                hadSeenVideos: hadSeenVideos,
              };
            });
          }
        }
      }
    }
  };
  return (
    <Swiper
      id={IDs.SWIPER_ROOT}
      allowTouchMove={true}
      direction="vertical"
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={24}
      className="w-full h-full relative"
      virtual
      onSlideChange={handleSlideChange}
    >
      {((videos && videos.status === "loading") ||
        (myID && !reFetchVideoTrigger.allowedFetchVideo)) && <Loading />}
      {videos && videos.status === "error" && (
        <Modal>
          <ErrorCard />
        </Modal>
      )}
      {videos &&
        Array.isArray(videos.list) &&
        videos.list.map((video, index) => {
          if (video.video) {
            return (
              <SwiperSlide
                className="w-full h-full rounded-md"
                key={video.video._id}
                virtualIndex={index}
              >
                <VideoSlide
                  index={index}
                  playerId={IDs.SWIPER_ROOT}
                  statistics={video.statistics}
                  avatarThumb={video.video.author_id.avatar_thumb.url_list[0]}
                  nickname={video.video.author_id.nickname}
                  allowedPlay={start}
                  video={video.video}
                  onStart={handleStart}
                />
              </SwiperSlide>
            );
          } else return null;
        })}
    </Swiper>
  );
};

export default SwiperWrapper;
