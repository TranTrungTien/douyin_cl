import { Link } from "react-router-dom";
import {
  isFollowUser,
  useAppDispatch,
  useAppSelector,
} from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { deleteData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import AvatarCardLink from "../avatar_card_link";
import Button from "../button";

type Props = {
  nickName: string;
  imageLink: string;
  uid: string;
  user_id: string;
  myID?: string;
};

const VideoPageUserBox = ({
  nickName,
  imageLink,
  uid,
  user_id,
  myID,
}: Props) => {
  const isFollowing = useAppSelector((state) =>
    isFollowUser(state, myID, user_id)
  );
  const dispatch = useAppDispatch();
  const onFollow = async () => {
    if (myID) {
      if (isFollowing) {
        const delFollowingRes = await deleteData(servicesPath.DEL_FOLLOWING, {
          follow_id: user_id,
        });
        delFollowingRes && delFollowingRes.data && console.log("unfollow");
      } else {
        const followingRes = await postData<any>(
          servicesPath.FOLLOW_USER,
          {
            follow_id: user_id,
          },
          true
        ).catch(console.error);
        followingRes && followingRes.data && console.log("followed");
      }
    } else {
      dispatch(setIsLogin(true));
    }
  };
  return (
    <div className="flex justify-between items-center space-x-2 w-full border-b border-darkslategray pb-5">
      <div className="flex justify-start items-center space-x-2">
        <AvatarCardLink
          title={nickName}
          height="h-62px"
          width="w-62px"
          image={imageLink}
          firstNickNameCharacter={nickName[0]}
          href={`/user/${uid}`}
        />
        <div className="flex flex-col justify-start items-start space-y-1 text-white">
          <Link to={`/user/${uid}`}>
            <h4 className="font-medium text-sm opacity-90 leading-[22px] truncate">
              {nickName}
            </h4>
          </Link>
          <div className="flex justify-center desktop:flex-row laptop:flex-col laptop:items-start desktop:items-center desktop:space-x-2 ">
            <div className="flex justify-center items-center space-x-px leading-5 text-xs">
              <span className="font-medium opacity-50 ">粉丝</span>
              <span className="font-semibold opacity-90 ">34.1w</span>
            </div>
            <div className="flex justify-center items-center space-x-px text-xs leading-5">
              <span className="font-medium opacity-50 ">获赞</span>
              <span className="font-semibold text-xs opacity-90">344.4w</span>
            </div>
          </div>
        </div>
      </div>
      {!isFollowing && (
        <Button
          onClick={onFollow}
          text="关注"
          width="w-[68px]"
          height="h-8"
          borderRadius="rounded"
        />
      )}
    </div>
  );
};

export default VideoPageUserBox;
