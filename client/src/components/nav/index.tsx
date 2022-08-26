import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import AvatarCardLink from "../avatar_card_link";
import BasicInfo from "../basic_info";
import Button from "../button";
import Login from "../login";
import Modal from "../modal";

type Props = {};

const Nav = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const login = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [emailVerified, setEmailVerified] = useState<{
    emailVerified: string;
    code: string;
  } | null>(null);
  const handleVerifyEmail = (emailVerified: string, code: string | null) => {
    emailVerified && code && setEmailVerified({ emailVerified, code });
  };

  const handleLoginChecking = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user.data) navigate("/upload");
    else dispatch(setIsLogin(true));
  };
  return (
    <ul className="flex justify-between items-center">
      <li className="opacity-80 hover:opacity-100 cursor-pointer desktop:block laptop:hidden ">
        <span>关于抖音</span>
      </li>
      <li className="opacity-80 hover:opacity-100 cursor-pointer desktop:block laptop:hidden ml-8">
        <span>创作者服务</span>
      </li>
      {user.data && (
        <li className="opacity-80 hover:opacity-100 cursor-pointer ml-8">
          <AvatarCardLink
            target="_blank"
            href={`/user/${user.data.uid}`}
            firstNickNameCharacter={user.data.nickname[0]}
            hint={user.data.nickname}
            image={user.data.avatar_thumb.url_list[0]}
            title={user.data.nickname}
          />
        </li>
      )}
      <li className="ml-8 relative">
        <Link target="_blank" onClick={handleLoginChecking} to={"/upload"}>
          {/* <div className="absolute top-0 z-[-1] -left-px w-[3px] h-full bg-bright_blue"></div> */}
          <div className="laptop:w-[100px] desktop:w-[104px] laptop:h-[36px] desktop:h-[38px] bg-light_blue flex justify-center item-center border-2 border-white w-[104px] h-[38px] rounded-[5px] before:absolute before:top-0 before:z-[-1] before:-right-[3px] before:w-full before:rounded-[5px]  before:h-full before:bg-fresh_red after:absolute after:top-0 after:z-[-1] after:-left-[3px] after:w-full after:rounded-[5px] after:h-full after:bg-bright_blue">
            <span className="laptop:leading-8 desktop:leading-9 text-lg mr-2">
              +
            </span>
            <span className="laptop:leading-8 desktop:leading-9">发布视频</span>
          </div>
          {/* <div className="absolute top-0 z-[-1] -right-px w-[3px] h-full bg-fresh_red"></div> */}
        </Link>
      </li>
      {!user.data && (
        <li className="ml-8">
          <Button
            onClick={() => {
              dispatch(setIsLogin(true));
            }}
            text="登录"
            className="laptop:w-[90px] desktop:w-[104px] laptop:h-[36px] desktop:h-[38px] px-4 font-medium leading-[23px] border border-fresh_red flex justify-center items-center text-white bg-fresh_red rounded-[5px]"
          />
        </li>
      )}
      {login.isLogin && !user.data && (
        <Modal>
          {emailVerified?.emailVerified && emailVerified?.code ? (
            <BasicInfo
              emailVerified={emailVerified.emailVerified}
              code={emailVerified.code}
            />
          ) : (
            <Login
              onVerifyEmail={handleVerifyEmail}
              onCloseLogin={() => dispatch(setIsLogin(false))}
            />
          )}
        </Modal>
      )}
    </ul>
  );
};

export default Nav;
