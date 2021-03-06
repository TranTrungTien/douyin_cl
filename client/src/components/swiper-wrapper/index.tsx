import { useMemo, useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { IVideo } from "../../interfaces/video.interface";
import { VideoSlide } from "../../layouts";
SwiperCore.use([Virtual]);

const SwiperWrapper = () => {
  const [start, setStart] = useState(false);
  const metaHeader = useMemo(() => {
    return axiosConfigHeaders(
      "json",
      "application/json",
      "application/json",
      null
    );
  }, []);
  const videos = useFetchSuspense<{ message: string; list: IVideo[] }>(
    "recommendation/new",
    metaHeader
  );
  const onStart = () => {
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
        videos.list.map((video, index) => (
          <SwiperSlide
            className="w-full h-full rounded-md"
            key={index}
            virtualIndex={index}
          >
            <VideoSlide
              avatar_thumb={video.author_id.avatar_thumb.url_list[0]}
              nickname={video.author_id.nickname}
              allowedPlay={start}
              video={video}
              onStart={onStart}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperWrapper;
