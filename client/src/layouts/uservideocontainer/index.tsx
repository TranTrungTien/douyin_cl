import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LikeFooter from "../../components/likefooter";
import VideoBadge from "../../components/videobadge";
import VideoCard from "../../components/videocard";
import VideoCardFooter from "../../components/videocardfooter";
import VideoContainer from "../../components/videocontainer";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
import { IVideo } from "../../interfaces/video.interface";

type Props = {
  cursor: number;
  author_id: string;
  viewLikedAllowed: boolean;
};

const UserVideoContainer = ({ author_id, cursor, viewLikedAllowed }: Props) => {
  console.log({ cursor });
  const [viewOpt, setViewOpt] = useState({ viewOwn: true, viewLiked: false });
  const [ownVideos, setOwnVideos] = useState<null | {
    message: string;
    list: IVideo[];
  }>(null);
  const jsonHeader = useMemo(() => {
    return axiosConfigHeaders("json", "application/json", "application/json", {
      author_id: author_id,
    });
  }, [author_id]);
  const count = useFetch<{
    message: string;
    ownVideoTotal: number;
    likedVideoTotal: number;
  } | null>("media/get-count", jsonHeader);

  useEffect(() => {
    axios
      .get<{ message: string; video_count: number; list: IVideo[] }>(
        "media/get-video-by-user",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            author_id: author_id,
            cursor: cursor,
          },
        }
      )
      .then((data) => {
        console.log(data.data.list);
        const d = data.data;
        setOwnVideos((preState) => {
          if (!preState) {
            return d;
          } else {
            return {
              ...preState,
              list: [...preState.list, ...d.list],
            };
          }
        });
      })
      .catch(alert);
  }, [author_id, cursor]);
  const onChangeViewOpt = (fromOwnVideo: number) => {
    if (!fromOwnVideo && !viewOpt.viewOwn) {
      setViewOpt({ viewOwn: true, viewLiked: false });
    } else if ((fromOwnVideo && viewOpt.viewOwn, viewLikedAllowed)) {
      setViewOpt({ viewOwn: false, viewLiked: true });
    }
  };
  return (
    <div className="extra-desktop:px-12 over-desktop:px-16 pt-8 space-y-6">
      <header className="laptop:px-3 desktop:px-5 extra-desktop:px-0 flex justify-start items-center space-x-10 leading-[26px] font-medium text-[18px] opacity-90">
        <button
          onClick={() => onChangeViewOpt(0)}
          className="flex justify-start items-center space-x-2"
        >
          <span className="">作品</span>
          {count && <span>{count.ownVideoTotal}</span>}
        </button>
        <button
          onClick={() => onChangeViewOpt(1)}
          className={`flex justify-start items-end space-x-2 opacity-70 ${
            viewLikedAllowed && "cursor-not-allowed"
          }`}
        >
          <span className="">喜欢</span>
          {count && <span>{count.likedVideoTotal}</span>}
          {!viewLikedAllowed && (
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
        </button>
      </header>
      <div className="laptop:max-w-[620px] desktop:max-w-[680px] extra-desktop:max-w-[776px]">
        <VideoContainer
          gapX="laptop:gap-x-5 desktop:gap-x-3"
          gapY="laptop:gap-y-5 desktop:gap-y-3"
          px="laptop:px-10 desktop:px-5 extra-desktop:px-0"
          gridCol="laptop:grid-cols-2 desktop:grid-cols-3"
        >
          {ownVideos &&
            ownVideos.list.map((video, index) => {
              return (
                <Link
                  target="_blank"
                  to={`/video/${video._id}/${video.id_f}`}
                  key={video._id}
                  className="block w-full  extra-desktop:h-full"
                >
                  <VideoCard
                    styleArray="laptop:h-[320px] desktop:h-[280px] extra-desktop:h-[328px] overflow-hidden"
                    cover_image={video.origin_cover.url_list[0]}
                  >
                    <VideoBadge pinned={true} text="置顶" />
                    <VideoCardFooter px="px-4" pb="pb-2">
                      <LikeFooter />
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
