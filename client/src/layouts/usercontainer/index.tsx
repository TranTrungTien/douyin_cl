import axios from "axios";
import { UIEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LikeFooter from "../../components/likefooter";
import UserBoxHeader from "../../components/userboxheader";
import VideoBadge from "../../components/videobadge";
import VideoCard from "../../components/videocard";
import VideoCardFooter from "../../components/videocardfooter";
import VideoContainer from "../../components/videocontainer";
import { IVideo } from "../../interfaces/video.interface";
import { RightBarAction } from "../videoslide";
type Props = {
  author_id: string;
  uid: string;
  avatar_thumb: string;
  nickname: string;
  handleCloseUserBox: (action: RightBarAction) => void;
};
const UserContainer = ({
  uid,
  author_id,
  avatar_thumb,
  nickname,
  handleCloseUserBox,
}: Props) => {
  const [ownVideos, setOwnVideos] = useState<null | {
    message: string;
    list: IVideo[];
  }>(null);
  const [cursor, setCursor] = useState(0);
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

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const toBottom =
      e.currentTarget.scrollHeight -
      e.currentTarget.scrollTop -
      e.currentTarget.clientHeight;
    if (toBottom <= 0) {
      setCursor((pre) => ++pre);
    }
  };

  return (
    <section className="w-full h-full overflow-hidden">
      <UserBoxHeader
        uid={uid}
        avatar_thumb={avatar_thumb}
        nickname={nickname}
        handleCloseUserBox={handleCloseUserBox}
      />
      <div
        onScroll={onScroll}
        className="h-[calc(100%-70px)] w-full overflow-x-hidden overflow-y-auto hidden-scrollbar"
      >
        <VideoContainer
          gridCol="laptop:grid-cols-2 desktop:grid-cols-3"
          px="laptop:px-3 "
          py="py-2"
          gapY="laptop:gap-y-2 desktop:gap-y-3"
          gapX="laptop:gap-x-2 desktop:gap-x-3"
        >
          {ownVideos &&
            ownVideos.list.map((video) => {
              return (
                <Link
                  key={video.id_f}
                  className="inline-block overflow-hidden self-center h-full"
                  target="_blank"
                  to={`/video/${video._id}/${video.id_f}`}
                >
                  <VideoCard
                    cover_image={video.origin_cover.url_list[0]}
                    styleArray="mx-auto laptop:max-w-auto laptop:max-h-[160px] extra-desktop:max-h-[170px] h-full"
                  >
                    <VideoBadge pinned={true} text="??????" />
                    <VideoCardFooter>
                      <LikeFooter />
                    </VideoCardFooter>
                  </VideoCard>
                </Link>
              );
            })}
          {/* <VideoCard>
            <VideoBadge hot={true} text="??????" />
            <VideoCardFooter>
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard> */}
        </VideoContainer>
      </div>
    </section>
  );
};

export default UserContainer;
