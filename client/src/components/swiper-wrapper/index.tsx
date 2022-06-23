import axios from "axios";
import { useEffect, useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { VideoSlide } from "../../layouts";
SwiperCore.use([Virtual]);

const SwiperWrapper = () => {
  const [videos, setVideos] = useState([]);
  const [start, setStart] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/recommendation/new", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((result) => {
        setVideos(result.data.list);
      })
      .catch((err) => {
        console.log({ err });
        alert("err");
      });
  }, []);
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
      {videos.length > 0 &&
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
