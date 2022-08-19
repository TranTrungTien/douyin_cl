import { MouseEvent, Suspense, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BackgroundVideo,
  Loading,
  Logo,
  Nav,
  Search,
  Video,
} from "../../components";
import Modal from "../../components/modal";
import { dataType } from "../../constants/type";
import {
  CommentContainer,
  HeaderContainer,
  LeftHeaderContainer,
  PageContainer,
  RelatedContainer,
  RelatedVideoContainer,
  SideContainer,
  VideoHeaderContainer,
} from "../../layouts";
import ErrorBoundary from "../../utils/error-boundaries";

import VideoPageUserBox from "../../components/video_page_user_box";
import { useFetch } from "../../hooks/useFetch";
import { IVideo } from "../../interfaces/video.interface";
import { servicesPath } from "../../services/services_path";
import { useAppSelector } from "../../redux/app/hooks";

type Props = {};

const VideoPage = (props: Props) => {
  const myID = useAppSelector((state) => state.user.data?._id);
  const [isPlay, setIsPlay] = useState(true);
  const { video_id: videoID, video_idf: videoIdf } = useParams();
  const videoParams = useMemo(() => {
    return {
      video_id: videoID,
    };
  }, [videoID]);
  const video = useFetch<{ message: string; doc: IVideo }>(
    servicesPath.GET_METADATA,
    videoParams,
    false,
    videoID ? true : false
  );

  const isLikedVideo = useFetch<{ message: string; like?: boolean }>(
    servicesPath.CHECK_LIKED,
    videoParams,
    true,
    videoID ? true : false
  );
  const handlePlayOrPause = (
    e: MouseEvent<HTMLElement> & {
      target: {
        dataset: { type: string };
        closest: (selector: any) => Node;
        tagName: string;
      };
    }
  ) => {
    if (
      e.target.dataset.type !== dataType &&
      !e.target.closest("[data-type='bottom_play_clickable']") &&
      !e.target.closest("[data-type='center_play_clickable']")
    )
      return;
    else {
      console.log("click");

      setIsPlay((pre) => !pre);
    }
  };
  return (
    <section className="w-full h-screen">
      <div
        style={{ overflow: "overlay" }}
        className="w-full h-full bg-light_blue custom-scrollbar"
      >
        <HeaderContainer backgroundColor="bg-light_blue">
          <LeftHeaderContainer>
            <Logo />
            <Search />
          </LeftHeaderContainer>
          <Nav />
        </HeaderContainer>
        <PageContainer className="pt-6">
          <div className="laptop:w-full laptop:px-6 desktop:px-0 desktop:max-w-[1080px] extra-desktop:w-[1280px] over-desktop:max-w-[1440px] flex laptop:justify-start desktop:justify-center items-start mx-auto laptop:space-x-3">
            <SideContainer
              width="laptop:w-[75%] desktop:w-[770px] extra-desktop:w-[850px] over-desktop:w-[960px]"
              height="h-full"
            >
              <section
                id="fullscreen"
                onClick={handlePlayOrPause}
                data-type="clickable"
                className="w-full laptop:h-[574px]  flex-1 relative grid place-content-center overflow-hidden rounded-md backdrop-blur-sm"
              >
                {video && (
                  <BackgroundVideo
                    coverImage={video.doc.origin_cover.url_list[0]}
                  />
                )}
                <Suspense fallback={<Loading />}>
                  <ErrorBoundary
                    fallback={
                      <Modal>
                        <div className="w-96 h-96 rounded bg-white text-center text-black">
                          <h1>Opps we ran into some problems</h1>
                        </div>
                      </Modal>
                    }
                  >
                    {video && (
                      <Video
                        myID={myID}
                        nickname={video.doc.author_id.nickname}
                        videoAddr={video.doc.play_addr.url_list[0]}
                        videoDesc={video.doc.desc}
                        videoDuration={video.doc.duration}
                        videoID={video.doc._id}
                        videoIdf={video.doc.id_f}
                        avatarThumb={
                          video.doc.author_id.avatar_thumb.url_list[0]
                        }
                        fromVideoPage={true}
                        isActive={true}
                        isPlay={isPlay ? true : false}
                        allowedPlay={true}
                      />
                    )}
                  </ErrorBoundary>
                </Suspense>
              </section>

              <div className="flex flex-col justify-start items-start w-full">
                {video && (
                  <VideoHeaderContainer
                    authorVideoID={video.doc.author_id._id}
                    myID={myID}
                    video={video.doc}
                    isLiked={isLikedVideo ? isLikedVideo?.like : false}
                  />
                )}
                <div className="flex justify-start items-center space-x-1 mt-4 w-full">
                  <span className="text-sm font-normal leading-6 text-white opacity-50">
                    全部评论
                  </span>
                  <div className="w-full h-px bg-darkslategray flex-1"></div>
                </div>
                <div className="w-full mt-6">
                  {videoID && (
                    <CommentContainer videoID={videoID} fromVideoPage={true} />
                  )}
                </div>
              </div>
            </SideContainer>
            <SideContainer width="w-auto" className="flex-1">
              <RelatedContainer>
                {video && (
                  <VideoPageUserBox
                    myID={myID}
                    user_id={video.doc.author_id._id}
                    uid={video.doc.author_id.uid}
                    imageLink={video.doc.author_id.avatar_thumb.url_list[0]}
                    nickName={video.doc.author_id.nickname}
                  />
                )}
                <div className="flex justify-start flex-col items-start text-white mt-10">
                  <h4 className="text-[18px] opacity-90 font-medium leading-[26px]">
                    推荐视频
                  </h4>
                  {videoID && (
                    <Suspense fallback={<Loading />}>
                      <ErrorBoundary
                        fallback={
                          <Modal>
                            <div className="w-96 h-96 rounded bg-white text-center text-black">
                              <h1>Opps we ran into some problems</h1>
                            </div>
                          </Modal>
                        }
                      >
                        {videoIdf && (
                          <RelatedVideoContainer videoIdf={videoIdf} />
                        )}
                      </ErrorBoundary>
                    </Suspense>
                  )}
                </div>
              </RelatedContainer>
            </SideContainer>
          </div>
        </PageContainer>
      </div>
    </section>
  );
};

export default VideoPage;
