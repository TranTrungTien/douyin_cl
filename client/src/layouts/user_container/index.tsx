import { UIEvent } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../components";
import LikeFooter from "../../components/like_footer";
import UserBoxHeader from "../../components/user_box_header";
import VideoBadge from "../../components/video_badge";
import VideoCard from "../../components/video_card";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
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
  videosData?: {
    status: "loading" | "success" | "error";
    list: {
      video: IVideo;
      statistics: IStatistics;
    }[];
  } | null;
  onCloseUserBox: (action: RightBarAction) => void;
  onScroll: (e: UIEvent<HTMLDivElement>) => void;
};
const UserContainer = ({
  myID,
  isFollow,
  uid,
  authorVideoID,
  avatarThumb,
  nickname,
  videosData,
  onCloseUserBox,
  onScroll,
}: Props) => {
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
        onScroll={onScroll}
        className="h-[calc(100%-70px)] w-full overflow-x-hidden overflow-y-auto hidden-scrollbar"
      >
        <VideoContainer className="relative grid laptop:grid-cols-2 desktop:grid-cols-3 laptop:px-3 py-2 laptop:gap-y-2 desktop:gap-y-3 laptop:gap-x-2 desktop:gap-x-3">
          {videosData &&
            videosData.list.map((video) => {
              return (
                <Link
                  key={video.video.id_f}
                  className="inline-block overflow-hidden self-center h-full"
                  target="_blank"
                  to={`/video/${video.video._id}/${video.video.id_f}`}
                >
                  <VideoCard
                    coverImage={video.video.origin_cover.url_list[0]}
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
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="w-full h-14 relative">
              {videosData?.status === "loading" && <Loading />}
            </div>
          </div>
        </VideoContainer>
      </div>
    </section>
  );
};

export default UserContainer;
