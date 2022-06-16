import LikeFooter from "../../components/likefooter";
import UserBoxHeader from "../../components/userboxheader";
import VideoBadge from "../../components/videobadge";
import VideoCard from "../../components/videocard";
import VideoCardFooter from "../../components/videocardfooter";
import VideoContainer from "../../components/videocontainer";
import { RightBarAction } from "../videoslide";

type Props = {
  handleCloseUserBox: (action: RightBarAction) => void;
};
const UserContainer = ({ handleCloseUserBox }: Props) => {
  return (
    <section className="w-full h-full overflow-hidden">
      <UserBoxHeader handleCloseUserBox={handleCloseUserBox} />
      <div>
        <VideoContainer px="px-2" py="py-2" gapY="gap-y-3">
          <VideoCard>
            <VideoBadge pinned={true} text="置顶" />
            <VideoCardFooter>
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard>
            <VideoBadge hot={true} text="热榜" />
            <VideoCardFooter>
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard>
            <VideoBadge hot={true} text="热榜" />
            <VideoCardFooter>
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard>
            <VideoCardFooter>
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
          <VideoCard>
            <VideoCardFooter>
              <LikeFooter />
            </VideoCardFooter>
          </VideoCard>
        </VideoContainer>
      </div>
    </section>
  );
};

export default UserContainer;
