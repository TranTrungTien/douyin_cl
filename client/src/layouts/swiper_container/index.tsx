import { useMemo, useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { VideoSlide } from "..";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import { servicesPath } from "../../services/services_path";
SwiperCore.use([Virtual]);

const SwiperWrapper = () => {
  const myID = useAppSelector((state) => state.user.data?._id);
  const [start, setStart] = useState(false);
  const videoParams = useMemo(() => {
    return {
      user_id: myID,
    };
  }, [myID]);
  const videos = useFetchSuspense<{
    message: string;
    data: [
      {
        video: IVideo;
        statistics: IStatistics;
        weight?: number;
      }
    ];
  }>(servicesPath.GET_NEW_RECOMMENDED, videoParams);
  const handleStart = () => {
    if (!start) setStart(true);
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
    >
      {videos &&
        Array.isArray(videos.data) &&
        videos.data.map((video, index) => {
          return (
            <SwiperSlide
              className="w-full h-full rounded-md"
              key={video.video._id}
              virtualIndex={index}
            >
              <VideoSlide
                statistics={video.statistics}
                avatarThumb={video.video.author_id.avatar_thumb.url_list[0]}
                nickname={video.video.author_id.nickname}
                allowedPlay={start}
                video={video.video}
                onStart={handleStart}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SwiperWrapper;
