import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Logo, Nav, RelatedSearch, Search } from "../../components";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import {
  HeaderContainer,
  HotSearchedContainer,
  SearchFilterHeader,
} from "../../layouts";
import VideoSearchedContainer from "../../layouts/video_searched_container";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";

export interface ISearchPapeData {
  isActive: boolean;
  isVisible: boolean;
  isNext: boolean;
  isPrev: boolean;
}

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
    keyWord && !videos?.list.length && fetchData();
  }, [keyWord, videos?.list.length]);

  return (
    <section
      style={{ overflow: "overlay" }}
      className="w-full h-full overflow-y-auto custom-scrollbar"
    >
      <HeaderContainer id="app_header" className="py-[5px]">
        <div className="flex justify-start items-center">
          <Logo py="py-1" />
          <Search value={keyWord ? keyWord : undefined} className="ml-[74px]" />
        </div>
        <Nav />
      </HeaderContainer>
      {/* extra-desktop:w-[1020px] over-desktop:w-[1280px] */}
      <div className="w-max h-full mx-auto mt-6">
        <div className="flex justify-center items-start text-white">
          <div className="mr-16 w-[874px] pb-10">
            {/* header */}
            <SearchFilterHeader />
            {videos &&
              videos.list.map((v, index) => {
                const stat = videos.statistics.find(
                  (stat) => stat.video_id === v._id
                );
                if (index === 2) {
                  return (
                    <>
                      <RelatedSearch />
                      <VideoSearchedContainer
                        key={v._id}
                        statistics={stat}
                        avatarThumb={v.author_id.avatar_thumb.url_list[0]}
                        nickname={v.author_id.nickname}
                        video={v}
                        className="w-full h-[550px]"
                      />
                    </>
                  );
                }
                return (
                  <VideoSearchedContainer
                    key={v._id}
                    statistics={stat}
                    avatarThumb={v.author_id.avatar_thumb.url_list[0]}
                    nickname={v.author_id.nickname}
                    video={v}
                    className="w-full h-[550px]"
                  />
                );
              })}

            <div className="text-center w-full">
              <p className="text-white font-xs mb-6">
                登录后可查看更多精彩视频
              </p>
              <Button
                text="点击登录"
                className="w-36 h-10 rounded text-white font-semibold bg-fresh_red"
              />
            </div>
          </div>
          {/* key words hot now */}
          <HotSearchedContainer />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
