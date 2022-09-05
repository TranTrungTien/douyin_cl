import React, { useMemo } from "react";
import { Button, RelatedSearch } from "../../components";
import { useFetchSuspense } from "../../hooks/use_fetch_suspense";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { servicesPath } from "../../services/services_path";
import VideoSearchedContainer from "../video_searched_container";

type Props = {
  keyWord: string;
};
const SearchedVideoContainer = ({ keyWord }: Props) => {
  const videosParams = useMemo(() => {
    return {
      text: keyWord,
      limit: 10,
    };
  }, [keyWord]);
  const videos = useFetchSuspense<{
    message: string;
    list: IVideo[];
    statistics: IStatistics[];
  } | null>(
    servicesPath.GET_SEARCH_RECOMMENDED,
    videosParams,
    true,
    false,
    "json"
  );
  return (
    <>
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
        <p className="text-white font-xs mb-6">登录后可查看更多精彩视频</p>
        <Button
          text="点击登录"
          className="w-36 h-10 rounded text-white font-semibold bg-fresh_red"
        />
      </div>
    </>
  );
};

export default SearchedVideoContainer;
