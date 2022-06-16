import LikeFooter from "../../components/likefooter";
import VideoBadge from "../../components/videobadge";
import VideoCard from "../../components/videocard";
import VideoCardFooter from "../../components/videocardfooter";
import VideoContainer from "../../components/videocontainer";

type Props = {};

const UserVideoContainer = (props: Props) => {
  return (
    <div
      style={{ boxShadow: "-18px 0px 80px #000" }}
      className="px-16 pt-8 space-y-6"
    >
      <header className="flex justify-start items-center space-x-10 leading-[26px] font-medium text-[18px] opacity-90">
        <div className="flex justify-start items-center space-x-1">
          <span className="">作品</span>
          <span>123</span>
        </div>
        <div className="flex justify-start items-center space-x-1 opacity-70">
          <span className="">喜欢</span>
          <span>123</span>
        </div>
      </header>
      <div className="w-[776px]">
        <VideoContainer gapX="gap-x-3" gapY="gap-y-3">
          <VideoCard width="246px" height="328px">
            <VideoBadge pinned={true} text="置顶" />
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoBadge hot={true} text="热榜" />
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoBadge hot={true} text="热榜" />
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoBadge pinned={true} text="置顶" />
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoBadge hot={true} text="热榜" />
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoBadge hot={true} text="热榜" />
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard width="246px" height="328px">
            <VideoCardFooter px="px-4" pb="pb-2">
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
        </VideoContainer>
      </div>
    </div>
  );
};

export default UserVideoContainer;
