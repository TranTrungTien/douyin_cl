import { useMemo, useState } from "react";
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
import { servicesPath } from "../../services/services_path";
SwiperCore.use([Virtual]);

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
    myID ? true : false,
    true
  );

  const videos = myID ? recommendedForUser : recommendedDefault;

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
        (videos.status === "success" ? (
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
          })
        ) : videos.status === "loading" ? (
          <Loading />
        ) : (
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
        ))}
    </Swiper>
  );
};

export default SwiperWrapper;
