import { MouseEvent, Suspense, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AvatarCardLink,
  BackgroundVideo,
  Button,
  Comment,
  LeftHeaderWrapper,
  Loading,
  Logo,
  Nav,
  Search,
  Video,
} from "../../components";
import Modal from "../../components/modal";
import { dataType } from "../../constants/type";
import {
  Header,
  PageContainer,
  Related,
  RelatedVideoContainer,
  SideContainer,
  VideoHeaderContainer,
} from "../../layouts";
import ErrorBoundary from "../../utils/error-boundaries";

import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
import { IVideo } from "../../interfaces/video.interface";

type Props = {};

const VideoPage = (props: Props) => {
  const [isPlay, setIsPlay] = useState(true);
  const { video_id, video_idf } = useParams();
  const mediaHeader = useMemo(() => {
    return axiosConfigHeaders("json", "application/json", "application/json", {
      video_id,
    });
  }, [video_id]);
  console.log(video_id);
  const video = useFetch<{ message: string; doc: IVideo }>(
    "media/get-meta-data",
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
        <Header backgroundColor="bg-light_blue">
          <LeftHeaderWrapper>
            <Logo />
            <Search />
          </LeftHeaderWrapper>
          <Nav />
        </Header>
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
                    ????????????
                  </span>
                  <div className="w-full h-px bg-darkslategray flex-1"></div>
                </div>
                <div className="w-full mt-6">
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                  <Comment styleArray="px-0" />
                </div>
              </div>
            </SideContainer>
            <SideContainer width="w-auto" styleArray="flex-1">
              <Related>
                <div className="flex justify-between items-center space-x-2 w-full border-b border-darkslategray pb-5">
                  <div className="flex justify-start items-center space-x-2">
                    <AvatarCardLink
                      height="h-62px"
                      width="w-62px"
                      image="https://images.statusfacebook.com/profile_pictures/unique-dp/unique-profile-pictures-for-whatsapp-01.jpg"
                      href="/user/abc"
                    />
                    <div className="flex flex-col justify-start items-start space-y-1 text-white">
                      <h4 className="font-medium text-sm opacity-90 leading-[22px] truncate">
                        ??????baby????
                      </h4>
                      <div className="flex justify-center desktop:flex-row laptop:flex-col laptop:items-start desktop:items-center desktop:space-x-2 ">
                        <div className="flex justify-center items-center space-x-px leading-5 text-xs">
                          <span className="font-medium opacity-50 ">??????</span>
                          <span className="font-semibold opacity-90 ">
                            34.1w
                          </span>
                        </div>
                        <div className="flex justify-center items-center space-x-px text-xs leading-5">
                          <span className="font-medium opacity-50 ">??????</span>
                          <span className="font-semibold text-xs opacity-90">
                            344.4w
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {}}
                    text="??????"
                    width="w-[68px]"
                    height="h-8"
                    borderRadius="rounded"
                  />
                </div>
                <div className="flex justify-start flex-col items-start text-white mt-10">
                  <h4 className="text-[18px] opacity-90 font-medium leading-[26px]">
                    ????????????
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
              </Related>
            </SideContainer>
          </div>
        </PageContainer>
      </div>
    </section>
  );
};

export default VideoPage;
