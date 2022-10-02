import { useState } from "react";
import { Link } from "react-router-dom";
import MoreIcon from "../../assets/icons/more_icon";
import { Button, LikeFooter, VideoBadge, VideoCard } from "../../components";
import { MessageTransfer } from "../../hooks/use_message";
import { deleteData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import VideoCardFooter from "../video_card_footer_container";

type Props = {
  videoId: string;
  videoIdf: string;
  cover: string;
  myID?: string;
  authorID: string;
  likeCount: number;
};
const VideoCardWrapper = ({
  authorID,
  cover,
  likeCount,
  myID,
  videoId,
  videoIdf,
}: Props) => {
  const [openOptions, setOpenOptions] = useState(false);
  const messages = MessageTransfer();
  const handleDeleteVideo = () => {
    if (myID !== authorID) {
      return;
    } else {
      deleteData(servicesPath.DELETE_VIDEO, {
        video_id: videoId,
      })
        .then((_) =>
          messages.sendMessage("Video Deleted Successfully", "success")
        )
        .catch((_) => messages.sendMessage("Failed to Delete Video", "danger"));
    }
  };
  return (
    <div className="relative group">
      {myID === authorID && (
        <div className="absolute z-10 top-0 right-0 w-10 h-10 grid place-content-center bg-[rgba(0,0,0,0.1)] rounded-full opacity-0 invisible select-none group-hover:opacity-100 group-hover:visible group-hover:select-auto">
          <div className="w-full h-full relative">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setOpenOptions(!openOptions);
              }}
              text=""
              className="bg-transparent w-full h-full"
            >
              <MoreIcon />
            </Button>
            {openOptions && (
              <div className="absolute top-full right-0">
                <div className="w-full h-full rounded overflow-hidden py-2 bg-darkslategray min-w-[150px]">
                  <div className="px-3 py-2 hover:bg-darkslategray2 w-full">
                    <span className="font-semibold font-sm opacity-90">
                      View Statistics
                    </span>
                  </div>
                  <Button
                    onClick={handleDeleteVideo}
                    className="px-3 py-2 hover:bg-darkslategray2 w-full text-left"
                    text="Delete"
                  ></Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Link
        target="_blank"
        to={`/video/${videoId}/${videoIdf}`}
        key={videoId}
        className="block w-full  extra-desktop:h-full"
      >
        <VideoCard
          className="laptop:h-[320px] desktop:h-[280px] extra-desktop:h-[328px] overflow-hidden"
          coverImage={cover}
        >
          <VideoBadge pinned={true} text="置顶" />
          <VideoCardFooter px="px-4" pb="pb-2">
            <LikeFooter likedCount={likeCount} />
          </VideoCardFooter>
        </VideoCard>
      </Link>
    </div>
  );
};

export default VideoCardWrapper;
