import AvatarCardButton from "../../components/avatarcardbutton";
import Button from "../../components/button";
import VerificationMark from "../../components/verificationmark";

type Props = {
  avatar_thumb_url: string;
  nickname: string;
  user_id: string;
};

const UserInfo = ({ avatar_thumb_url, nickname, user_id }: Props) => {
  return (
    <div className="laptop:max-w-[320px] desktop:max-w-[350px] extra-desktop:max-w-[400px] ml-auto px-3  space-y-4">
      <header className="flex justify-start items-center laptop:space-x-9">
        <AvatarCardButton
          firstNickNameCharacter={nickname[0]}
          image={avatar_thumb_url}
          height="h-62px"
          width="w-62px"
          hint="User Cover"
        />
        <div className="text-white opacity-90 leading-5 flex justify-center items-center laptop:space-x-6 desktop:space-x-16">
          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-xs font-normal opacity-50">关注</span>
            {/* following */}
            <span className="text-[17px] font-medium">123</span>
          </div>
          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-xs font-normal opacity-50">粉丝</span>
            {/* follower */}
            <span className="text-[17px] font-medium">123w</span>
          </div>
          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-xs font-normal opacity-50">获赞</span>
            {/* favoring count */}
            <span className="text-[17px] font-medium">1.1亿</span>
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
          <span>{user_id}</span>
        </div>
        <div className="flex flex-col justify-start items-start opacity-80 leading-[22px] text-sm font-normal">
          <span>谢谢您点进来看我</span>
          <span>谢谢您点进来看我</span>
          <span>谢谢您点进来看我</span>
          <span>谢谢您点进来看我</span>
        </div>
      </div>
      <div className="flex justify-start items-center space-x-3">
        <Button text="关注" onClick={() => {}} />
        <button className="w-9 h-9 grid place-content-center border border-darkslategray2 rounded bg-darkslategray3">
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
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
