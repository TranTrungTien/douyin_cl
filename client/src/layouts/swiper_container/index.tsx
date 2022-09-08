import { useEffect, useMemo, useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { VideoSlide } from "..";
import { Button, Loading } from "../../components";
import Modal from "../../components/modal";
import { useFetchAppend } from "../../hooks/use_fetch_append";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import { getData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
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
  const [reFetchVideoTrigger, setReFetchVideoTrigger] = useState({
    allowedFetchVideo: false,
    trigger: false,
  });
  const videoParams = useMemo(() => {
    return {
      limit: 10,
    };
  }, []);
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
    "json",
    "application/json",
    reFetchVideoTrigger.trigger
  );
  useEffect(() => {
    let intervalId: any;
    if (myID) {
      const handleTraining = () => {
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
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [myID]);

  const videos = myID ? recommendedForUser : recommendedDefault;
  const handleSlideChange = (swiper: SwiperCore) => {
    if (videos) {
      if (videos.list.length - swiper.activeIndex === 3)
        setReFetchVideoTrigger((prev) => {
          return {
            ...prev,
            trigger: !prev.trigger,
          };
        });
    }
  };
  return (
    <Swiper
      id="fullscreen"
      allowTouchMove={true}
      direction="vertical"
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={24}
      className="w-full h-full relative"
      virtual
      onSlideChange={handleSlideChange}
    >
      {videos && videos.status === "loading" && <Loading />}
      {videos && videos.status === "error" && (
        <Modal>
          <div className="w-96 h-96 rounded bg-white text-center text-black">
            <h1>Opps we ran into some problems</h1>
            <Button
              text="Refresh page"
              onClick={() => window.location.reload()}
            />
            <Button
              text="Comme back home page"
              onClick={() => window.location.replace("/")}
            />
          </div>
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
                  playerId={"fullscreen"}
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
