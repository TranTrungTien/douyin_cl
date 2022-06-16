import { useRef } from "react";
import {
  AvatarCardLink,
  BottomVideoAction,
  Button,
  Comment,
  Heart,
  LeftHeaderWrapper,
  Logo,
  Nav,
  NextVideoButton,
  ProgressBar,
  RightVideoAction,
  Search,
  TimeFooter,
  VideoCard,
  VideoCardFooter,
} from "../../components";
import Video from "../../components/video";
import {
  Header,
  RelatedVideoContainer,
  SideContainer,
  PageContainer,
  VideoHeaderContainer,
} from "../../layouts";

type Props = {};

const VideoPage = (props: Props) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef({ progressRef, progressBarRef });
  const timeCounterRef = useRef<HTMLSpanElement>(null);
  const onChangeVideo = (isNextAction: boolean) => {};
  const onChangeVideoTime = (position: number) => {};
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
          <div className="2xl:max-w-[1306] 2xl:w-[1306px] flex justify-center items-start mx-auto space-x-3">
            <SideContainer width="w-[960px]" height="h-full">
              <Video width="h-[574px]">
                <BottomVideoAction
                  metaData={{ author: "", desc: "" }}
                  progressBar={
                    <ProgressBar
                      ref={progressContainerRef}
                      handleChangeVideoTime={onChangeVideoTime}
                    />
                  }
                  ref={timeCounterRef}
                />
                <RightVideoAction>
                  <NextVideoButton handleChangeVideo={onChangeVideo} />
                </RightVideoAction>
              </Video>
              <div className="flex flex-col justify-start items-start w-full">
                <VideoHeaderContainer />
                <div className="flex justify-start items-center space-x-1 mt-4 w-full">
                  <span className="text-sm font-normal leading-6 text-white opacity-50">
                    全部评论
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
              <RelatedVideoContainer>
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
                        猫七baby🍓
                      </h4>
                      <div className="flex justify-center items-center space-x-2 ">
                        <div className="flex justify-center items-center space-x-px leading-5 text-xs">
                          <span className="font-medium opacity-50 ">粉丝</span>
                          <span className="font-semibold opacity-90 ">
                            34.1w
                          </span>
                        </div>
                        <div className="flex justify-center items-center space-x-px text-xs leading-5">
                          <span className="font-medium opacity-50 ">获赞</span>
                          <span className="font-semibold text-xs opacity-90">
                            344.4w
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {}}
                    text="关注"
                    width="w-[68px]"
                    height="h-8"
                    borderRadius="rounded"
                  />
                </div>
                <div className="flex justify-start flex-col items-start text-white mt-10">
                  <h4 className="text-[18px] opacity-90 font-medium leading-[26px]">
                    推荐视频
                  </h4>
                  <div className="flex flex-col justify-start items-start space-y-6 w-full h-full mt-6">
                    <div className="flex justify-start items-start space-x-2 w-full h-full">
                      <VideoCard width="w-[120px]" height="h-[90px]">
                        <VideoCardFooter>
                          <TimeFooter
                            bottom="bottom-1"
                            right="right-2"
                            time="11:32"
                          />
                        </VideoCardFooter>
                      </VideoCard>
                      <div className="flex-1 h-[90px] flex flex-col justify-between items-start space-y-1">
                        <h1 className="block w-full font-medium text-sm opacity-90 leading-[22px] flex-1 truncate-n-line">
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视
                        </h1>
                        <div className="flex justify-between items-center w-full">
                          <Heart styleArray="font-medium leading-5 text-xs opacity-70" />
                          <a href="/user">
                            <span className="font-normal leading-5 text-xs opacity-70 truncate">
                              猫七baby🍓
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start items-start space-x-2 w-full h-full">
                      <VideoCard width="w-[120px]" height="h-[90px]">
                        <VideoCardFooter>
                          <TimeFooter
                            bottom="bottom-1"
                            right="right-2"
                            time="11:32"
                          />
                        </VideoCardFooter>
                      </VideoCard>
                      <div className="flex-1 h-[90px] flex flex-col justify-between items-start space-y-1">
                        <h1 className="block w-full font-medium text-sm opacity-90 leading-[22px] flex-1 truncate-n-line">
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视
                        </h1>
                        <div className="flex justify-between items-center w-full">
                          <Heart styleArray="font-medium leading-5 text-xs opacity-70" />
                          <a href="/user">
                            <span className="font-normal leading-5 text-xs opacity-70 truncate">
                              猫七baby🍓
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start items-start space-x-2 w-full h-full">
                      <VideoCard width="w-[120px]" height="h-[90px]">
                        <VideoCardFooter>
                          <TimeFooter
                            bottom="bottom-1"
                            right="right-2"
                            time="11:32"
                          />
                        </VideoCardFooter>
                      </VideoCard>
                      <div className="flex-1 h-[90px] flex flex-col justify-between items-start space-y-1">
                        <h1 className="block w-full font-medium text-sm opacity-90 leading-[22px] flex-1 truncate-n-line">
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视
                        </h1>
                        <div className="flex justify-between items-center w-full">
                          <Heart styleArray="font-medium leading-5 text-xs opacity-70" />
                          <a href="/user">
                            <span className="font-normal leading-5 text-xs opacity-70 truncate">
                              猫七baby🍓
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start items-start space-x-2 w-full h-full">
                      <VideoCard width="w-[120px]" height="h-[90px]">
                        <VideoCardFooter>
                          <TimeFooter
                            bottom="bottom-1"
                            right="right-2"
                            time="11:32"
                          />
                        </VideoCardFooter>
                      </VideoCard>
                      <div className="flex-1 h-[90px] flex flex-col justify-between items-start space-y-1">
                        <h1 className="block w-full font-medium text-sm opacity-90 leading-[22px] flex-1 truncate-n-line">
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视 推荐视频推荐视
                          推荐视频推荐视 推荐视频推荐视
                        </h1>
                        <div className="flex justify-between items-center w-full">
                          <Heart styleArray="font-medium leading-5 text-xs opacity-70" />
                          <a href="/user">
                            <span className="font-normal leading-5 text-xs opacity-70 truncate">
                              猫七baby🍓
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RelatedVideoContainer>
            </SideContainer>
          </div>
        </PageContainer>
      </div>
    </section>
  );
};

export default VideoPage;
