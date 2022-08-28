import { useState } from "react";
import FollowingIcon from "../../assets/icons/following_icon";
import AvatarCardButton from "../../components/avatar_card_button";
import Button from "../../components/button";
import VerificationMark from "../../components/verification_mark";
import {
  isFollowUser,
  useAppDispatch,
  useAppSelector,
} from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { deleteData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";

type Props = {
  avatarThumb: string;
  nickname: string;
  authorPageID: string;
  followingCount?: number;
  followerCount?: number;
  totalFavouringCount?: number;
};

const UserInfoContainer = ({
  avatarThumb,
  nickname,
  authorPageID,
  followerCount = 0,
  totalFavouringCount = 0,
  followingCount = 0,
}: Props) => {
  const myID = useAppSelector((state) => state.user.data?._id);
  const dispatch = useAppDispatch();
  const isFollow = useAppSelector((state) =>
    isFollowUser(state, myID, authorPageID)
  );

  const [isFollowing, setIsFollowing] = useState(isFollow ? true : false);
  const handleFollow = async () => {
    if (myID) {
      if (isFollowing) {
        const delFollowRes = await deleteData(servicesPath.DEL_FOLLOWING, {
          follow_id: authorPageID,
        });
        if (delFollowRes && delFollowRes.data) {
          console.log("del followed");
          setIsFollowing(false);
        }
      } else {
        const followRes = await postData<any>(
          servicesPath.FOLLOW_USER,
          {
            follow_id: authorPageID,
          },
          true
        ).catch(console.error);
        if (followRes && followRes.data) {
          console.log("followed");
          setIsFollowing(true);
        }
      }
    } else dispatch(setIsLogin(true));
  };

  return (
    <div className="laptop:max-w-[320px] desktop:max-w-[350px] extra-desktop:max-w-[400px] ml-auto px-3  space-y-4">
      <header className="flex justify-start items-center laptop:space-x-9">
        <AvatarCardButton
          firstNickNameCharacter={nickname[0]}
          image={avatarThumb}
          height="h-62px"
          width="w-62px"
          title={nickname}
          hint="User Cover"
        />
        <div className="text-white opacity-90 leading-5 flex justify-center items-center laptop:space-x-6 desktop:space-x-16">
          <div className="flex flex-col justify-center items-center space-y-1">
            <span className="text-xs font-normal opacity-50">关注</span>
            {/* following */}
            <span className="text-[17px] font-medium">{followingCount}</span>
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <span className="text-xs font-normal opacity-50">粉丝</span>
            {/* follower */}
            <span className="text-[17px] font-medium">{followerCount}</span>
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <span className="text-xs font-normal opacity-50">获赞</span>
            {/* favoring count */}
            <span className="text-[17px] font-medium">
              {totalFavouringCount}亿
            </span>
          </div>
        </div>
      </header>
      <div className="space-y-2">
        <div className="flex justify-start items-center space-x-3">
          <h1 className="text-xl font-medium opacity-90">{nickname}</h1>
          <VerificationMark />
        </div>
        <div className="flex justify-start items-center space-x-2 opacity-80 text-xs font-normal leading-5">
          <span>抖音号:</span>
          <span>{authorPageID}</span>
        </div>
        <div className="flex flex-col justify-start items-start opacity-80 leading-[22px] text-sm font-normal">
          <span>谢谢您点进来看我</span>
          <span>谢谢您点进来看我</span>
          <span>谢谢您点进来看我</span>
          <span>谢谢您点进来看我</span>
        </div>
      </div>
      <div className="flex justify-start items-center space-x-3">
        {myID !== authorPageID && (
          <Button
            title={isFollowing ? "" : "关注"}
            icon={isFollowing && <FollowingIcon />}
            text={isFollowing ? "" : "关注"}
            onClick={handleFollow}
            className={`w-[68px] h-36px rounded text-sm
              ${
                isFollowing &&
                `border-darkslategray2 border flex justify-center items-center`
              }
              ${isFollowing ? " bg-darkslategray3" : "bg-fresh_red"}
            `}
          />
        )}
        <Button
          text=""
          className="w-9 h-9 grid place-content-center  border border-darkslategray2 rounded bg-darkslategray3"
          icon={
            <svg
              width="12"
              height="4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0, 0, 12, 4"
            >
              <path
                d="M2.667 2.187a1.333 1.333 0 11-2.667 0 1.333 1.333 0 012.667 0zM7.333 2.187a1.333 1.333 0 11-2.666 0 1.333 1.333 0 012.666 0zM10.667 3.52a1.333 1.333 0 100-2.667 1.333 1.333 0 000 2.667z"
                fill="currentColor"
              ></path>
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default UserInfoContainer;
