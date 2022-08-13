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
import { servicesPath } from "../../services/services_path";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
import { IVideo } from "../../interfaces/video.interface";

type Props = {};

const VideoPage = (props: Props) => {
  const [isPlay, setIsPlay] = useState(true);
  const { video_id, video_idf } = useParams();
  const mediaHeader = useMemo(() => {
    return axiosConfigHeaders(
      "GET",
      "json",
      "application/json",
      "application/json",
      {
        video_id,
      }
    );
  }, [video_id]);
  console.log(video_id);
  const video = useFetch<{ message: string; doc: IVideo }>(
    servicesPath.GET_METADATA,
    mediaHeader
  );
  const onPlayOrPause = (
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
        <PageContainer styleArray="pt-6">
          <div className="laptop:w-full laptop:px-6 desktop:px-0 desktop:max-w-[1080px] extra-desktop:w-[1280px] over-desktop:max-w-[1440px] flex laptop:justify-start desktop:justify-center items-start mx-auto laptop:space-x-3">
            <SideContainer
              width="laptop:w-[75%] desktop:w-[770px] extra-desktop:w-[850px] over-desktop:w-[960px]"
              height="h-full"
            >
              <section
                id="fullscreen"
                onClick={onPlayOrPause}
                data-type="clickable"
                className="w-full laptop:h-[574px]  flex-1 relative grid place-content-center overflow-hidden rounded-md backdrop-blur-sm"
              >
                {video && (
                  <BackgroundVideo
                    cover_url={video.doc.origin_cover.url_list[0]}
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
                        nickname={video.doc.author_id.nickname}
                        video_addr={video.doc.play_addr.url_list[0]}
                        video_desc={video.doc.desc}
                        video_duration={video.doc.duration}
                        video_id={video.doc._id}
                        video_idf={video.doc.id_f}
                        avatar_thumb={
                          video.doc.author_id.avatar_thumb.url_list[0]
                        }
                        fromVideoPage={true}
                        isActive={true}
                        isPlay={isPlay ? true : false}
                        onChangeVideo={() => {}}
                        allowedPlay={true}
                      />
                    )}
                  </ErrorBoundary>
                </Suspense>
              </section>

              <div className="flex flex-col justify-start items-start w-full">
                {video && <VideoHeaderContainer video={video.doc} />}
                <div className="flex justify-start items-center space-x-1 mt-4 w-full">
                  <span className="text-sm font-normal leading-6 text-white opacity-50">
                    全部评论
                  </span>
                  <div className="w-full h-px bg-darkslategray flex-1"></div>
                </div>
                <div className="w-full mt-6">
                  {video_id && (
                    <CommentContainer
                      video_id={video_id}
                      fromVideoPage={true}
                    />
                  )}
                </div>
              </div>
            </SideContainer>
            <SideContainer width="w-auto" styleArray="flex-1">
              <RelatedContainer>
                {video && (
                  <VideoPageUserBox
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
                  {video_id && (
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
                        {video_idf && <RelatedVideoContainer id={video_idf} />}
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
