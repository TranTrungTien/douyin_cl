import { Link } from "react-router-dom";
import SmallHeartIcon from "../../assets/icons/small_heart_icon";
import VideoCardFooter from "../../layouts/video_card_footer_container";
import Heart from "../heart";
import TimeFooter from "../time_footer";
import VideoCard from "../video_card";

type Props = {
  likedCount?: number;
  coverImage: string;
  nickname: string;
  time?: string;
  videoId?: string;
  videoIdf: string;
  desc: string;
};
const RelatedVideo = ({
  coverImage,
  nickname,
  desc,
  likedCount = 0,
  videoIdf,
  videoId,
  time = "00:00",
}: Props) => {
  return (
    <Link to={`/video/${videoId}/${videoIdf}`}>
      <div className="flex justify-start items-start laptop:flex-col desktop:flex-row desktop:space-x-2 w-full h-full">
        <VideoCard
          coverImage={coverImage}
          className="laptop:self-start laptop:w-[200px] laptop:h-[120px] desktop:w-[110px] desktop:h-[80px] extra-desktop:w-[120px] extra-desktop:h-[90px]"
        >
          <VideoCardFooter>
            <TimeFooter
              bottom="bottom-1"
              right="right-2"
              time={time}
              className="font-normal text-xs"
            />
          </VideoCardFooter>
        </VideoCard>
        <div className="flex-1 h-[90px] flex flex-col justify-between items-start space-y-1">
          <h1 className="block w-full font-medium text-sm opacity-90 leading-[22px] flex-1 truncate-n-line">
            {desc}
          </h1>
          <div className="flex justify-between items-center w-full">
            <Heart
              icon={<SmallHeartIcon />}
              className="font-medium leading-5 text-xs opacity-70 flex justify-start items-center flex-row"
            >
              <span>{likedCount}</span>
            </Heart>
            <div>
              <span className="font-normal leading-5 text-xs opacity-70 truncate">
                {nickname}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedVideo;
