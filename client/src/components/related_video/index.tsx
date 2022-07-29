import { Link } from "react-router-dom";
import Heart from "../heart";
import TimeFooter from "../time_footer";
import VideoCard from "../video_card";
import VideoCardFooter from "../../layouts/video_card_footer_container";

type Props = {
  video_cover: string;
  nickname: string;
  desc: string;
};
const RelatedVideo = ({ video_cover, nickname, desc }: Props) => {
  return (
    <div className="flex justify-start items-start laptop:flex-col desktop:flex-row laptop:space-y-2 desktop:space-x-2 w-full h-full">
      <VideoCard
        cover_image={video_cover}
        styleArray="laptop:self-start laptop:w-[200px] laptop:h-[120px] desktop:w-[110px] desktop:h-[80px] extra-desktop:w-[120px] extra-desktop:h-[90px]"
      >
        <VideoCardFooter>
          <TimeFooter
            bottom="bottom-1"
            right="right-2"
            time="11:32"
            styleArray="font-normal text-xs"
          />
        </VideoCardFooter>
      </VideoCard>
      <div className="flex-1 h-[90px] flex flex-col justify-between items-start space-y-1">
        <h1 className="block w-full font-medium text-sm opacity-90 leading-[22px] flex-1 truncate-n-line">
          {desc}
        </h1>
        <div className="flex justify-between items-center w-full">
          <Heart styleArray="font-medium leading-5 text-xs opacity-70" />
          <Link to="/user">
            <span className="font-normal leading-5 text-xs opacity-70 truncate">
              {nickname}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedVideo;
