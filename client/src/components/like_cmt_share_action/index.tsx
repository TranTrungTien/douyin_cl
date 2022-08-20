import { useState } from "react";
import { RightBarAction } from "../../layouts/video_slide";
import { useAppDispatch } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { deleteData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import Button from "../button";
import DeleteIcon from "../../assets/icons/delete_icon.svg";
import Heart from "../heart";
import LargeHeart from "../../assets/icons/large_heart_icon";
import CommentIcon from "../../assets/icons/comment_icon";
import StarsIcon from "../../assets/icons/star_icon";
import ShareIcon from "../../assets/icons/share_icon";

type Props = {
  onOpenRightBar?: (action: RightBarAction) => void;
  myID?: string;
  countLiked?: number;
  countComments?: number;
  countStars?: number;
  authorVideoID?: string;
  liked?: boolean;
  classNameInner?: string;
  className?: string;
  widthSvg?: string;
  heightSvg?: string;
  videoId: string;
};
const LikeCmtShare = ({
  liked,
  countLiked = 0,
  countComments = 0,
  countStars = 0,
  myID,
  authorVideoID,
  videoId,
  onOpenRightBar,
  classNameInner,
  className = "flex flex-col justify-center items-center space-y-2",
  widthSvg = "36",
  heightSvg = "36",
}: Props) => {
  const [like, setLike] = useState(liked ? true : false);

  const dispatch = useAppDispatch();

  const handleLikeVideo = async () => {
    if (myID) {
      if (!authorVideoID && !videoId) {
        alert("Error");
        return;
      }
      if (!like) {
        setLike(!like);
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
        setLike(!like);
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
        icon={<LargeHeart heightSvg={36} widthSvg={36} isLiked={like} />}
        onClick={handleLikeVideo}
        title="喜欢"
        className={`${classNameInner} text-white opacity-80 hover:opacity-100`}
      >
        <span className="font-medium text-[15px] leading-[23px]">
          {countLiked}
        </span>
      </Heart>
      {/* cmt icon */}
      <Button
        width="w-auto"
        height="h-auto"
        text=""
        backgroundColor="bg-transparent"
        title="评论"
        className={`${classNameInner} text-white opacity-80 hover:opacity-100`}
        onClick={() => {
          if (!onOpenRightBar) return;
          onOpenRightBar({ comment: true, isOpen: true, user: false });
        }}
        icon={<CommentIcon heightSvg={36} widthSvg={36} />}
      >
        <span className="font-medium text-[15px] leading-[23px]">{0}</span>
      </Button>
      {/* star icon */}
      <Button
        text=""
        backgroundColor="bg-transparent"
        width="w-auto"
        height="h-auto"
        className={`${classNameInner} text-white opacity-80 hover:opacity-100`}
        icon={<StarsIcon heightSvg={36} widthSvg={36} />}
      >
        <span className="font-medium text-[15px] leading-[23px]">
          {countStars}
        </span>
      </Button>
      {/* share icon */}
      <Button
        width="w-auto"
        height="h-auto"
        text=""
        backgroundColor="bg-transparent"
        title="分享"
        className={`${classNameInner} text-white opacity-80 hover:opacity-100`}
        icon={<ShareIcon heightSvg={36} widthSvg={36} />}
      />
      {/* report icon */}

      <Button
        onClick={handleOpenOptions}
        text=""
        backgroundColor="bg-transparent"
        width="w-auo"
        height="h-auto"
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
