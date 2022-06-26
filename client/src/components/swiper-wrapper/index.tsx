import { useMemo, useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
import { VideoSlide } from "../../layouts";
SwiperCore.use([Virtual]);

interface IVideo {
  author: string;
  desc: string;
  link: string;
  local_link: string;
}

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
  const videos = useFetch<IVideo[]>("recommendation/new", metaHeader);
  const onStart = () => {
    if (!start) setStart(true);
  };
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={24}
      className="w-full h-full relative"
      virtual
    >
      {Array.isArray(videos) &&
        videos.map((video, index) => (
          <SwiperSlide
            className="w-full h-full rounded-md"
            key={index}
            virtualIndex={index}
          >
            <VideoSlide allowedPlay={start} video={video} onStart={onStart} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperWrapper;