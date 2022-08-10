import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { servicesPath } from "../../config/app_config";
import { IFollowing } from "../../interfaces/following";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import AvatarCardLink from "../avatar_card_link";
import Button from "../button";

type Props = {
  nickName: string;
  imageLink: string;
  uid: string;
  user_id: string;
};

const VideoPageUserBox = ({ nickName, imageLink, uid, user_id }: Props) => {
  const my_id = useAppSelector((state) => state.user.data?._id);
  const dispatch = useAppDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    if (my_id) {
      axios
        .get<{ message: string; doc: IFollowing }>(
          servicesPath.CHECK_FOLLOWING,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              follow_id: user_id,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data?.doc) setIsFollowing(true);
        })
        .catch((err) => console.log(err));
    }
  }, [my_id, user_id]);
  const onFollow = () => {
    if (my_id) {
      if (isFollowing) {
        console.log("clicked ...");
        axios
          .delete(servicesPath.DEL_FOLLOWING, {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              follow_id: user_id,
            },
            withCredentials: true,
          })
          .then((_) => setIsFollowing(false))
          .catch(alert);
      } else {
        axios
          .post(
            servicesPath.FOLLOW_USER,
            {
              follow_id: user_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
          .then((_) => setIsFollowing(true))
          .catch(alert);
      }
    } else {
      dispatch(setIsLogin(true));
    }
  };
  console.log({ isFollowing });

  return (
    <div className="flex justify-between items-center space-x-2 w-full border-b border-darkslategray pb-5">
      <div className="flex justify-start items-center space-x-2">
        <AvatarCardLink
          title={nickName}
          height="h-62px"
          width="w-62px"
          image={imageLink && `${servicesPath.BASE_URL}/${imageLink}`}
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
