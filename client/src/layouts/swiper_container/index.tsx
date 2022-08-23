import { useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { VideoSlide } from "..";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { servicesPath } from "../../services/services_path";
SwiperCore.use([Virtual]);

const SwiperWrapper = () => {
  const [start, setStart] = useState(false);
  const videos = useFetchSuspense<{
    message: string;
    list: IVideo[];
    statistics?: IStatistics[];
  }>(servicesPath.GET_NEW_RECOMMENDED, null);
  const handleStart = () => {
    if (!start) setStart(true);
  };
  return (
    <Swiper
      id="fullscreen"
      allowTouchMove={false}
      direction="vertical"
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={24}
      className="w-full h-full relative"
      virtual
    >
      {videos &&
        Array.isArray(videos.list) &&
        videos.list.map((video, index) => {
          const statistics = videos.statistics?.find(
            (statistic) => statistic.video_id === video._id
          );
          return (
            <SwiperSlide
              className="w-full h-full rounded-md"
              key={video._id}
              virtualIndex={index}
            >
              <VideoSlide
                statistics={statistics}
                avatarThumb={video.author_id.avatar_thumb.url_list[0]}
                nickname={video.author_id.nickname}
                allowedPlay={start}
                video={video}
                onStart={handleStart}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SwiperWrapper;
