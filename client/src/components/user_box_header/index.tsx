import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RightBarAction } from "../../layouts/video_slide";
import { useAppDispatch } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import AvatarCard from "../avatar_card_button";
import Button from "../button";

type Props = {
  isFollow?: boolean;
  myID?: string;
  avatarThumb: string;
  nickname: string;
  uid: string;
  authorVideoID: string;
  onCloseUserBox: (action: RightBarAction) => void;
};

const UserBoxHeader = ({
  myID,
  authorVideoID,
  isFollow,
  avatarThumb,
  nickname,
  uid,
  onCloseUserBox,
}: Props) => {
  const dispatch = useAppDispatch();
  const [follow, setFollow] = useState(isFollow);
  useEffect(() => {
    setFollow(isFollow);
  }, [isFollow]);
  const onCloseUser = () => {
    onCloseUserBox({ comment: false, isOpen: false, user: false });
  };
  const handleFollow = async () => {
    if (myID && authorVideoID) {
      setFollow(true);
      const followRes = await postData<any>(
        servicesPath.FOLLOW_USER,
        {
          follow_id: authorVideoID,
        },
        true
      ).catch(console.error);
      followRes && followRes.data && console.log("followed");
    } else {
      dispatch(setIsLogin(true));
    }
  };
  return (
    <header className="laptop:px-2 desktop:px-3 py-3 extra-desktop:px-4 w-full h-auto sticky top-0 left-0">
      <div className="flex justify-between items-center w-full h-auto laptop:space-x-3 desktop:space-x-2 laptop:items-center">
        <div className="flex justify-start desktop:flex-row desktop:items-center laptop:items-center laptop:space-x-2 desktop:space-x-3">
          <AvatarCard
            firstNickNameCharacter={nickname[0]}
            hint={nickname}
            borderRadius="full"
            image={avatarThumb}
          />
          <div className="text-white flex flex-col justify-start items-start space-y-2 flex-1 desktop:mt-0">
            <div className="flex justify-center items-center space-x-1 hover:text-fresh_red ">
              <h1 className="leading-[22px] font-medium text-base opacity-90">
                <Link target="_blank" to={`/user/${uid}`}>
                  {nickname}
                </Link>
              </h1>
              <span className="laptop:hidden extra-desktop:block mt-px">
                <svg
                  width="19"
                  height="19"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current opacity-80"
                  viewBox="-7 -1 19 19"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M.793 14.23a1 1 0 010-1.415l5.293-5.293L.793 2.23A1 1 0 012.207.815l6 6a1 1 0 010 1.415l-6 6a1 1 0 01-1.414 0z"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="laptop:hidden desktop:block mt-px flex justify-center items-center desktop:space-x-3 extra-desktop:space-x-5 opacity-90 text-xs font-normal">
              <span>
                <span>63.0w</span>粉丝
              </span>
              <span>
                <span>63.0w</span>获赞
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-white items-center desktop:space-x-3 laptop:space-x-2">
          {!follow && (
            <Button
              onClick={handleFollow}
              className="text-white font-normal rounded px-5 bg-fresh_red h-8"
              text="关注"
            />
          )}
          <div className="flex justify-start items-center">
            <Button
              text=""
              className="laptop:hidden desktop:block text-white opacity-50 hover:opacity-100"
              icon={
                <svg
                  width="36"
                  height="36"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M19.63 21.11a.5.5 0 00.777.417l5.031-3.334a.5.5 0 00-.028-.85l-5.032-2.87a.5.5 0 00-.747.434v6.203zm4.485 2.533h-12.9c-.668 0-1.215.547-1.215 1.215s.547 1.215 1.215 1.215h12.9c.668 0 1.215-.547 1.215-1.215s-.547-1.215-1.215-1.215zM11.2 12.43h12.915c.668 0 1.215-.547 1.215-1.215S24.783 10 24.115 10h-12.9c-.668 0-1.215.547-1.215 1.215s.531 1.215 1.2 1.215zm0 6.53h5.15c.668 0 1.215-.547 1.215-1.216 0-.668-.547-1.214-1.215-1.214h-5.135c-.668 0-1.215.546-1.215 1.214 0 .669.531 1.215 1.2 1.215z"></path>
                </svg>
              }
            />
            <Button
              onClick={onCloseUser}
              className="text-white opacity-50 hover:opacity-100"
              text=""
              icon={
                <svg
                  width="36"
                  height="36"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M22.133 23.776a1.342 1.342 0 101.898-1.898l-4.112-4.113 4.112-4.112a1.342 1.342 0 00-1.898-1.898l-4.112 4.112-4.113-4.112a1.342 1.342 0 10-1.898 1.898l4.113 4.112-4.113 4.113a1.342 1.342 0 001.898 1.898l4.113-4.113 4.112 4.113z"></path>
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserBoxHeader;
