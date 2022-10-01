import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Loading } from "../../components";
import LikeFooter from "../../components/like_footer";
import Modal from "../../components/modal";
import VideoBadge from "../../components/video_badge";
import VideoCard from "../../components/video_card";
import { useFetch } from "../../hooks/use_fetch";
import { useFetchAppend } from "../../hooks/use_fetch_append";
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
  onChangeViewPoint: (viewOwnVideo: boolean) => void;
  onStopFetchingMoreVideo: () => void;
};

const UserVideoContainer = ({
  authorID,
  cursor,
  viewLikedAllowed,
  onChangeViewPoint,
  onStopFetchingMoreVideo,
}: Props) => {
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
      limit: 20,
    };
  }, [authorID, cursor.viewOwn.cursorPosition]);

  const { data: ownVideos } = useFetchAppend<{
    video: IVideo;
    statistics: IStatistics;
  }>(
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
      limit: 20,
    };
  }, [authorID, cursor.viewLiked.cursorPosition]);

  const { data: likedVideos } = useFetchAppend<{
    video: IYourVideoLiked;
    statistics: IStatistics;
  }>(
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
      onChangeViewPoint(true);
    } else if (
      !viewOwn &&
      viewOpt.viewOwn &&
      (viewLikedAllowed || authorID === myID)
    ) {
      onChangeViewPoint(false);
      setViewOpt({ viewOwn: false, viewLiked: true });
    }
  };

  return (
    <div className="extra-desktop:px-12 over-desktop:px-16 py-8 space-y-6">
      <header className="laptop:px-3 desktop:px-5 extra-desktop:px-0 flex justify-start items-center space-x-10 leading-[26px] font-medium text-[18px] opacity-90">
        <Button
          text=""
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
      <div className="laptop:max-w-[620px] laptop:min-w-[620px] desktop:max-w-[680px] desktop:min-w-[680px] extra-desktop:max-w-[776px] extra-desktop:min-w-[776px]">
        <VideoContainer className="min-h-[calc(100vh*0.3)] relative grid laptop:gap-x-5 desktop:gap-x-3 laptop:gap-y-5 desktop:gap-y-3 laptop:px-10 desktop:px-5 extra-desktop:px-0 laptop:grid-cols-2 desktop:grid-cols-3">
          {viewOpt.viewOwn
            ? ownVideos?.status === "error" &&
              ownVideos?.statusCode !== 404 && (
                <Modal>
                  <div className="w-96 h-96 rounded bg-white text-center text-black">
                    <h1>OWn Videos Opps we ran into some problems</h1>
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
              )
            : likedVideos?.status === "error" &&
              likedVideos.statusCode !== 404 && (
                <Modal>
                  <div className="w-96 h-96 rounded bg-white text-center text-black">
                    <h1> Liked Videos Opps we ran into some problems</h1>
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
              )}
          {viewOpt.viewOwn
            ? ownVideos &&
              ownVideos.list.map((video, index) => {
                return (
                  <Link
                    // ref={
                    //   index === ownVideos.list.length - 1
                    //     ? ownVideosRef
                    //     : undefined
                    // }
                    target="_blank"
                    to={`/video/${video.video._id}/${video.video.id_f}`}
                    key={video.video._id}
                    className="block w-full  extra-desktop:h-full"
                  >
                    <VideoCard
                      className="laptop:h-[320px] desktop:h-[280px] extra-desktop:h-[328px] overflow-hidden"
                      coverImage={video.video.origin_cover.url_list[0]}
                    >
                      <VideoBadge pinned={true} text="置顶" />
                      <VideoCardFooter px="px-4" pb="pb-2">
                        <LikeFooter
                          likedCount={video.statistics.like_count || 0}
                        />
                      </VideoCardFooter>
                    </VideoCard>
                  </Link>
                );
              })
            : likedVideos &&
              likedVideos.list.map((video, index) => {
                return (
                  <Link
                    // ref={
                    //   index === likedVideos.list.length - 1
                    //     ? likedVideosRef
                    //     : undefined
                    // }
                    target="_blank"
                    to={`/video/${video.video.video_id._id}/${video.video.video_id.id_f}`}
                    key={video.video._id}
                    className="block w-full  extra-desktop:h-full"
                  >
                    <VideoCard
                      className="laptop:h-[320px] desktop:h-[280px] extra-desktop:h-[328px] overflow-hidden"
                      coverImage={video.video.video_id.origin_cover.url_list[0]}
                    >
                      <VideoBadge pinned={true} text="置顶" />
                      <VideoCardFooter px="px-4" pb="pb-2">
                        <LikeFooter
                          likedCount={video.statistics.like_count || 0}
                        />
                      </VideoCardFooter>
                    </VideoCard>
                  </Link>
                );
              })}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="relative f-full h-14">
              {viewOpt.viewOwn
                ? ownVideos?.status === "loading" && <Loading />
                : likedVideos?.status === "loading" && <Loading />}
            </div>
          </div>
        </VideoContainer>
      </div>
    </div>
  );
};

export default UserVideoContainer;
