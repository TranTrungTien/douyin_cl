import { UIEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LikeFooter from "../../components/like_footer";
import UserBoxHeader from "../../components/user_box_header";
import VideoBadge from "../../components/video_badge";
import VideoCard from "../../components/video_card";
import { useFetchAppend } from "../../hooks/useFetchAppend";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { servicesPath } from "../../services/services_path";
import VideoCardFooter from "../video_card_footer_container";
import VideoContainer from "../video_container";
import { RightBarAction } from "../video_slide";
type Props = {
  isFollow?: boolean;
  myID?: string;
  authorVideoID: string;
  uid: string;
  avatarThumb: string;
  nickname: string;
  onCloseUserBox: (action: RightBarAction) => void;
};
const UserContainer = ({
  myID,
  isFollow,
  uid,
  authorVideoID,
  avatarThumb,
  nickname,
  onCloseUserBox,
}: Props) => {
  const [cursor, setCursor] = useState(0);
  const ownVideosParams = useMemo(() => {
    return {
      author_id: authorVideoID,
      cursor: cursor,
      limit: 15,
    };
  }, [authorVideoID, cursor]);
  const { data: ownVideos } = useFetchAppend<IVideo, IStatistics>(
    servicesPath.GET_VIDEO_BY_USER,
    ownVideosParams,
    undefined,
    undefined,
    authorVideoID ? true : false
  );

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
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
        myID={myID}
        isFollow={isFollow}
        authorVideoID={authorVideoID}
        uid={uid}
        avatarThumb={avatarThumb}
        nickname={nickname}
        onCloseUserBox={onCloseUserBox}
      />
      <div
        onScroll={handleScroll}
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
                    coverImage={video.origin_cover.url_list[0]}
                    className="mx-auto laptop:max-w-auto laptop:max-h-[160px] extra-desktop:max-h-[170px] h-full"
                  >
                    <VideoBadge pinned={true} text="置顶" />
                    <VideoCardFooter>
                      <LikeFooter />
                    </VideoCardFooter>
                  </VideoCard>
                </Link>
              );
            })}
        </VideoContainer>
      </div>
    </section>
  );
};

export default UserContainer;
