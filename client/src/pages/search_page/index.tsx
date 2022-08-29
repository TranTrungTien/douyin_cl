import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Logo, Nav, Search } from "../../components";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { HeaderContainer } from "../../layouts";
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
    <section className="w-full h-full overflow-y-auto">
      <HeaderContainer className="py-[5px]">
        <Logo />
        <Search className="-ml-52" value={keyWord ? keyWord : undefined} />
        <Nav />
      </HeaderContainer>
      <div className="w-[55%] h-full mx-auto">
        {videos &&
          videos.list.map((v, index) => {
            const stat = videos.statistics.find(
              (stat) => stat.video_id === v._id
            );
            return (
              <VideoSearchedContainer
                key={v._id}
                statistics={stat}
                avatarThumb={v.author_id.avatar_thumb.url_list[0]}
                nickname={v.author_id.nickname}
                video={v}
                className="w-full h-[650px]"
              />
            );
          })}
      </div>
    </section>
  );
};

export default SearchPage;
