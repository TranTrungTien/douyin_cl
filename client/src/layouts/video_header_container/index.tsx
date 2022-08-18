import LikeCmtShare from "../../components/like_cmt_share_action";
import { IVideo } from "../../interfaces/video.interface";
import { useAppSelector } from "../../redux/app/hooks";
import "./style.css";

type Props = {
  myID?: string;
  isLiked?: boolean;
  authorVideoID?: string;
  video: IVideo;
};

const VideoHeaderContainer = ({
  myID,
  isLiked,
  authorVideoID,
  video,
}: Props) => {
  return (
    <header className="w-full h-auto pt-2 text-white mt-2">
      <div className="flex flex-col justify-start items-start space-y-px">
        <h1 className="leading-[26px] font-medium opacity-90 text-lg w-full truncate-3-lines">
          {video.desc}
        </h1>
        <div className="flex justify-between items-center w-full">
          <LikeCmtShare
            authorVideoID={authorVideoID}
            liked={isLiked}
            myID={myID}
            videoId={video._id}
            styleArray="flex justify-start items-center space-x-6"
            styleArrayInner="flex justify-center items-center space-x-2"
            widthSvg="32"
            heightSvg="32"
          />
          <div className="text-sm font-normal opacity-50 leading-[22px] flex justify-center items-center space-x-6">
            <div className="flex justify-between items-center space-x-1">
              <svg
                width="15"
                height="13.9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0, 1, 15, 14.9"
              >
                <path
                  d="M14.82 11.575c.675 1.098-.151 2.562-1.579 2.562H1.744c-1.353 0-2.18-1.464-1.503-2.562L6.027 1.84c.3-.585.902-.878 1.503-.878.601 0 1.202.293 1.503.878l5.786 9.736zm-1.178.672l-.011-.017-5.786-9.736-.04-.071c-.047-.092-.141-.144-.275-.144-.134 0-.229.052-.276.144l-.039.07-5.797 9.754c-.144.235.052.573.326.573H13.24c.346 0 .546-.336.4-.573zm-6.245-7.03c-.343 0-.617.201-.617.453v3.562c0 .251.274.452.617.452h.136c.343 0 .616-.201.616-.452V5.67c0-.252-.273-.453-.616-.453h-.136zm-.617 5.916c0 .168.074.336.201.455a.715.715 0 00.968 0c.127-.119.2-.287.2-.455a.633.633 0 00-.2-.456.715.715 0 00-.968 0 .634.634 0 00-.2.456z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>举报</span>
            </div>
            <div className="flex justify-between items-center">
              <span>发布时间：</span>
              <span>2021-09-24 20:32</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VideoHeaderContainer;
