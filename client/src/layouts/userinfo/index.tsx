import AvatarCardButton from "../../components/avatarcardbutton";
import Button from "../../components/button";
import VerificationMark from "../../components/verificationmark";

type Props = {};

const UserInfo = (props: Props) => {
  return (
    <div className="2xl:max-w-[400px] ml-auto px-3  space-y-4">
      <header className="flex justify-start items-center space-x-9">
        <AvatarCardButton
          image="https://luv.vn/wp-content/uploads/2021/09/hinh-anh-gai-xinh-trung-quoc-96-edited.jpg"
          height="h-62px"
          width="w-62px"
          hint="User Cover"
        />
        <div className="text-white opacity-90 leading-5 flex justify-center items-center space-x-16">
          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-xs font-normal opacity-50">关注</span>
            <span className="text-[17px] font-medium">123</span>
          </div>
          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-xs font-normal opacity-50">粉丝</span>
            <span className="text-[17px] font-medium">123w</span>
          </div>
          <div className="flex flex-col justify-center items-start space-y-1">
            <span className="text-xs font-normal opacity-50">获赞</span>
            <span className="text-[17px] font-medium">1.1亿</span>
          </div>
        </div>
      </header>
      <div className="space-y-2">
        <div className="flex justify-start items-center space-x-3">
          <h1 className="text-xl font-medium opacity-90">芒果捞头条君</h1>
          <VerificationMark />
        </div>
        <div className="flex justify-start items-center space-x-2 opacity-80 text-xs font-normal leading-5">
          <span>抖音号:</span>
          <span>12345677</span>
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
