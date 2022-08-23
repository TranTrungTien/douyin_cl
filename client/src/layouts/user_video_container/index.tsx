import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import LikeFooter from "../../components/like_footer";
import VideoBadge from "../../components/video_badge";
import VideoCard from "../../components/video_card";
import { useFetch } from "../../hooks/useFetch";
import { useFetchAppend } from "../../hooks/useFetchAppend";
import { IYourVideoLiked } from "../../interfaces/liked_video.interface";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { ICursorState } from "../../pages/userpage";
import { useAppSelector } from "../../redux/app/hooks";
import { servicesPath } from "../../services/services_path";
import VideoCardFooter from "../video_card_footer_container";
import VideoContainer from "../video_container";

type Props = {
  cursor: ICursorState;
  authorID: string;
  viewLikedAllowed: boolean;
  onStopFetchingMoreVideo: () => void;
};

const UserVideoContainer = ({
  authorID,
  cursor,
  viewLikedAllowed,
  onStopFetchingMoreVideo,
}: Props) => {
  console.log({ cursor });
  const currentCursorPosition = useRef({
    viewOwn: -1,
    viewLiked: -1,
  });
  const myID = useAppSelector((state) => state.user.data?._id);
  const [viewOpt, setViewOpt] = useState({ viewOwn: true, viewLiked: false });

  const countParams = useMemo(() => {
    return {
      author_id: authorID,
    };
  }, [authorID]);

  const count = useFetch<{
    message: string;
    ownVideoTotal: number;
    likedVideoTotal: number;
  } | null>(
    servicesPath.GET_COUNT,
    countParams,
    false,
    authorID ? true : false
  );
  const ownVideosParams = useMemo(() => {
    return {
      author_id: authorID,
      cursor: cursor.viewOwn.cursorPosition,
      include_like_count: 1,
      limit: 15,
    };
  }, [authorID, cursor.viewOwn.cursorPosition]);

  const { data: ownVideos } = useFetchAppend<IVideo, IStatistics>(
    servicesPath.GET_VIDEO_BY_USER,
    ownVideosParams,
    onStopFetchingMoreVideo,
    () =>
      (currentCursorPosition.current.viewOwn = cursor.viewOwn.cursorPosition),
    viewOpt.viewOwn &&
      currentCursorPosition.current.viewOwn !== cursor.viewOwn.cursorPosition
  );
  const likedVideosParams = useMemo(() => {
    return {
      author_id: authorID,
      cursor: cursor.viewLiked.cursorPosition,
      include_like_count: 1,
      limit: 15,
    };
  }, [authorID, cursor.viewLiked.cursorPosition]);

  const { data: likedVideos } = useFetchAppend<IYourVideoLiked, IStatistics>(
    servicesPath.GET_ALL_VIDEO_LIKED_BY_USER,
    likedVideosParams,
    onStopFetchingMoreVideo,
    () =>
      (currentCursorPosition.current.viewLiked =
        cursor.viewLiked.cursorPosition),
    viewOpt.viewLiked &&
      currentCursorPosition.current.viewLiked !==
        cursor.viewLiked.cursorPosition
  );

  const handleChangeViewOpt = (viewOwn: boolean) => {
    if (viewOwn && !viewOpt.viewOwn) {
      setViewOpt({ viewOwn: true, viewLiked: false });
    } else if (
      !viewOwn &&
      viewOpt.viewOwn &&
      (viewLikedAllowed || authorID === myID)
    ) {
      setViewOpt({ viewOwn: false, viewLiked: true });
    }
  };
  console.log(viewOpt);
  return (
    <div className="extra-desktop:px-12 over-desktop:px-16 py-8 space-y-6">
      <header className="laptop:px-3 desktop:px-5 extra-desktop:px-0 flex justify-start items-center space-x-10 leading-[26px] font-medium text-[18px] opacity-90">
        <Button
          text=""
          backgroundColor="bg-transparent"
          width="w-auto"
          height="h-auto"
          onClick={() => handleChangeViewOpt(true)}
          className={`${
            viewOpt.viewOwn
              ? "text-white opacity-100"
              : "text-gray-400 opacity-80"
          } flex justify-start items-center space-x-2 text-base`}
        >
          <span>作品</span>
          {count && <span>{count.ownVideoTotal}</span>}
        </Button>
        <Button
          text=""
          backgroundColor="bg-transparent"
          width="w-auto"
          height="h-auto"
          onClick={() => handleChangeViewOpt(false)}
          className={`flex justify-start items-center space-x-2 text-base ${
            !viewLikedAllowed &&
            authorID !== myID &&
            "cursor-not-allowed opacity-70"
          } ${
            viewOpt.viewLiked
              ? "text-white opacity-100"
              : "text-gray-400 opacity-80"
          } `}
        >
          <span className="">喜欢</span>
          {count && <span>{count.likedVideoTotal}</span>}
          {!viewLikedAllowed && authorID !== myID && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="2 2 28 28"
                width="28px"
                height="28px"
              >
                <path d="M 16 3 C 12.15625 3 9 6.15625 9 10 L 9 13 L 6 13 L 6 29 L 26 29 L 26 13 L 23 13 L 23 10 C 23 6.15625 19.84375 3 16 3 Z M 16 5 C 18.753906 5 21 7.246094 21 10 L 21 13 L 11 13 L 11 10 C 11 7.246094 13.246094 5 16 5 Z M 8 15 L 24 15 L 24 27 L 8 27 Z" />
              </svg>
            </div>
          )}
        </Button>
      </header>
      <div className="laptop:max-w-[620px] desktop:max-w-[680px] extra-desktop:max-w-[776px]">
        <VideoContainer
          gapX="laptop:gap-x-5 desktop:gap-x-3"
          gapY="laptop:gap-y-5 desktop:gap-y-3"
          px="laptop:px-10 desktop:px-5 extra-desktop:px-0"
          gridCol="laptop:grid-cols-2 desktop:grid-cols-3"
        >
          {viewOpt.viewOwn
            ? ownVideos &&
              ownVideos.list.map((video) => {
                const likedCount = ownVideos.statistics?.find(
                  (statistic) => statistic.video_id === video._id
                );
                return (
                  <Link
                    target="_blank"
                    to={`/video/${video._id}/${video.id_f}`}
                    key={video._id}
                    className="block w-full  extra-desktop:h-full"
                  >
                    <VideoCard
                      className="laptop:h-[320px] desktop:h-[280px] extra-desktop:h-[328px] overflow-hidden"
                      coverImage={video.origin_cover.url_list[0]}
                    >
                      <VideoBadge pinned={true} text="置顶" />
                      <VideoCardFooter px="px-4" pb="pb-2">
                        <LikeFooter likedCount={likedCount?.like_count} />
                      </VideoCardFooter>
                    </VideoCard>
                  </Link>
                );
              })
            : likedVideos &&
              likedVideos.list.map((video) => {
                const likedCount = likedVideos.statistics?.find(
                  (statistic) => statistic.video_id === video._id
                );
                return (
                  <Link
                    target="_blank"
                    to={`/video/${video.video_id._id}/${video.video_id.id_f}`}
                    key={video._id}
                    className="block w-full  extra-desktop:h-full"
                  >
                    <VideoCard
                      className="laptop:h-[320px] desktop:h-[280px] extra-desktop:h-[328px] overflow-hidden"
                      coverImage={video.video_id.origin_cover.url_list[0]}
                    >
                      <VideoBadge pinned={true} text="置顶" />
                      <VideoCardFooter px="px-4" pb="pb-2">
                        <LikeFooter likedCount={likedCount?.like_count} />
                      </VideoCardFooter>
                    </VideoCard>
                  </Link>
                );
              })}
        </VideoContainer>
      </div>
    </div>
  );
};

export default UserVideoContainer;
