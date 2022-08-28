import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Logo, Nav, Search } from "../../components";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { HeaderContainer, VideoSlide } from "../../layouts";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get("k");
  const [videos, setVideos] = useState<{
    message: string;
    list: IVideo[];
    statistics: IStatistics[];
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await postData<{
        message: string;
        list: IVideo[];
        statistics: IStatistics[];
      }>(servicesPath.GET_SEARCH_RECOMMENDED, {
        text: keyWord,
        limit: 25,
      });
      setVideos(data.data);
    };
    keyWord && fetchData();
  }, [keyWord]);
  console.log({ videos });

  return (
    <section className="w-full h-full overflow-y-auto">
      <HeaderContainer className="py-[9px]">
        <Logo />
        <Search />
        <Nav />
      </HeaderContainer>
      <div className="w-[50%] h-full mx-auto">
        {videos &&
          videos.list.map((v, index) => {
            const stat = videos.statistics.find(
              (stat) => stat.video_id === v._id
            );
            return (
              <VideoSlide
                searchPageData={
                  index === 0
                    ? {
                        isActive: true,
                        isNext: false,
                        isPrev: false,
                        isVisible: true,
                      }
                    : {
                        isActive: false,
                        isNext: false,
                        isPrev: false,
                        isVisible: true,
                      }
                }
                key={v._id}
                allowedPlay={false}
                statistics={stat}
                avatarThumb={v.author_id.avatar_thumb.url_list[0]}
                nickname={v.author_id.nickname}
                video={v}
                onStart={() => {}}
                className="w-full h-[600px] my-40"
              />
            );
          })}
      </div>
    </section>
  );
};

export default SearchPage;
