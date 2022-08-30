import { useEffect, useState } from "react";
import { RightBarAction } from "../../layouts/video_slide";
import { useAppDispatch } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { deleteData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import Button from "../button";
import Heart from "../heart";
import LargeHeart from "../../assets/icons/large_heart_icon";
import CommentIcon from "../../assets/icons/comment_icon";
import StarsIcon from "../../assets/icons/star_icon";
import ShareIcon from "../../assets/icons/share_icon";
import { IStatistics } from "../../interfaces/statistic";

type Props = {
  onOpenRightBar?: (action: RightBarAction) => void;
  myID?: string;
  statistics?: IStatistics;
  authorVideoID?: string;
  isLiked?: boolean;
  classNameInner?: string;
  className?: string;
  widthSvg?: string;
  heightSvg?: string;
  videoId: string;
};
const LikeCmtShare = ({
  isLiked,
  statistics,
  myID,
  authorVideoID,
  videoId,
  onOpenRightBar,
  classNameInner,
  className = "flex flex-col justify-center items-center space-y-2",
  widthSvg = "36",
  heightSvg = "36",
}: Props) => {
  console.log("render");

  const [videoData, setVideoData] = useState({
    isLiked,
    ...statistics,
  });
  useEffect(() => {
    setVideoData((prev) => {
      return {
        ...prev,
        ...statistics,
        isLiked,
      };
    });
  }, [isLiked, statistics]);

  const dispatch = useAppDispatch();

  const handleLikeVideo = async () => {
    if (myID) {
      if (!authorVideoID && !videoId) {
        alert("Error");
        return;
      }
      if (!videoData.isLiked) {
        setVideoData((prev) => {
          return {
            ...prev,
            like_count: (prev.like_count || 0) + 1,
            isLiked: true,
          };
        });
        const likeRes = await postData(
          servicesPath.POST_LIKE_VIDEO,
          {
            video_id: videoId,
            author_video_id: authorVideoID,
          },
          true
        ).catch(console.error);
        likeRes && likeRes.data && console.log("liked video");
      } else {
        setVideoData((prev) => {
          return {
            ...prev,
            like_count: (prev.like_count || 0) - 1,
            isLiked: false,
          };
        });
        const delRes = await deleteData(servicesPath.DEL_LIKE_VIDEO, {
          video_id: videoId,
          author_video_id: authorVideoID,
        }).catch(console.error);
        delRes && delRes.data && console.log("del like video successfully");
      }
    } else {
      dispatch(setIsLogin(true));
    }
  };
  const handleOpenOptions = () => {
    console.log("click");
  };
  return (
    <div className={`${className}`}>
      {/* heart icon */}
      <Heart
        icon={
          <LargeHeart
            heightSvg={36}
            widthSvg={36}
            isLiked={videoData.isLiked}
          />
        }
        onClick={handleLikeVideo}
        title="喜欢"
        className={`${classNameInner} icon_animation text-white opacity-80 hover:opacity-100 overflow-visible`}
      >
        <span className="font-medium text-[15px] leading-[23px]">
          {videoData.like_count}
        </span>
      </Heart>
      {/* cmt icon */}
      <Button
        text=""
        title="评论"
        className={`${classNameInner} icon_animation text-white opacity-80 hover:opacity-100`}
        onClick={() => {
          if (!onOpenRightBar) return;
          onOpenRightBar({ comment: true, isOpen: true, user: false });
        }}
        icon={<CommentIcon heightSvg={36} widthSvg={36} />}
      >
        <span className="font-medium text-[15px] leading-[23px]">
          {videoData.comment_count}
        </span>
      </Button>
      {/* star icon */}
      <Button
        text=""
        className={`${classNameInner} icon_animation text-white opacity-80 hover:opacity-100`}
        icon={<StarsIcon heightSvg={36} widthSvg={36} />}
      >
        <span className="font-medium text-[15px] leading-[23px]">
          {videoData.stars_count}
        </span>
      </Button>
      {/* share icon */}
      <Button
        text=""
        title="分享"
        className={`${classNameInner} icon_animation text-white opacity-80 hover:opacity-100`}
        icon={<ShareIcon heightSvg={36} widthSvg={36} />}
      />
      {/* report icon */}

      <Button
        onClick={handleOpenOptions}
        text=""
        className={`${classNameInner} text-white opacity-80 hover:opacity-100 relative`}
        icon={
          <div>
            <svg
              width={`${widthSvg}`}
              height={`${heightSvg}`}
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
            >
              <path d="M13.556 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM19.778 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM24.222 19.556a1.778 1.778 0 100-3.556 1.778 1.778 0 000 3.556z"></path>
            </svg>
          </div>
        }
      >
        <div className="bg-white absolute bottom-full left-0"></div>
      </Button>
    </div>
  );
};

export default LikeCmtShare;
