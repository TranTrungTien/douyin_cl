import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import SwiperCore, { Virtual } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { Loading } from "../../components";
import Modal from "../../components/modal";
import VideoSlide from "../videoslide";

SwiperCore.use([Virtual]);

type Props = {};
const VideoSlideContainer = (props: Props) => {
  console.log("video slide container re render");
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(true);
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
  const onCloseModal = () => {
    setModal(false);
  };
  return (
    <main className="w-full h-[95%] px-[30px] overflow-hidden">
      <Suspense fallback={<Loading />}>
        <Swiper
          direction="vertical"
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={24}
          className="w-full h-full"
          virtual
        >
          {videos.length > 0 &&
            videos.map((video, index) => (
              <SwiperSlide
                className="w-full h-full rounded-md"
                key={index}
                virtualIndex={index}
              >
                <VideoSlide allowedPlay={!modal && true} video={video} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Suspense>
      {modal && (
        <Modal>
          <div>
            Modal
            <button type="button" onClick={onCloseModal}>
              Close modal
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default VideoSlideContainer;
