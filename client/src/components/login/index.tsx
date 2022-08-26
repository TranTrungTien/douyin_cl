import Button from "../button";
import SubRegisterOrLogin from "../sub_login";

type Props = {
  onVerifyEmail: (emailVerified: string, code: string | null) => void;
  onCloseLogin: () => void;
};
const Login = ({ onCloseLogin, onVerifyEmail }: Props) => {
  return (
    <div className="xl:w-[360px] h-[360px] box-border">
      <div
        className="w-full h-full rounded-md p-[24px_38px_40px] flex flex-col justify-start items-start relative"
        style={{
          backgroundColor: "#fff",
          backgroundImage: 'url("/images/login_background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Button
          text=""
          onClick={onCloseLogin}
          type="button"
          title="close"
          className="absolute top-3 right-5"
        >
          X
        </Button>
        <header className="w-full text-center">
          <h4 className="font-medium text-lg text-center">登录后抖音更懂你</h4>
          <ul className="grid w-full grid-cols-4 text-center font-light text-[9px]">
            <li>推荐更懂你</li>
            <li>搜索更精彩</li>
            <li>畅聊直播间</li>
            <li>解锁点赞互动</li>
          </ul>
        </header>
        <div className="w-full flex-1 rounded bg-white p-[10px_25px] mt-5">
          <ul className="grid grid-cols-3 place-content-center">
            <li className="text-[13px] font-normal text-center relative after:absolute after:w-full after:h-[2px] after:bg-fresh_red after:rounded-lg after:left-0 after:-bottom-1">
              扫码登录
            </li>
            <li className="text-[13px] font-normal text-center relative">
              验证码登录
            </li>
            <li className="text-[13px] font-normal text-center relative">
              密码登录
            </li>
          </ul>
          <SubRegisterOrLogin onVerifyEmail={onVerifyEmail} />
        </div>
      </div>
    </div>
  );
};

export default Login;
