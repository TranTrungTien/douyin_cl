import axios from "axios";
import { MouseEvent, useRef } from "react";

type Props = {
  onVerifyEmail: (emailVerified: string) => void;
  onCloseLogin: () => void;
};
const Login = ({ onCloseLogin, onVerifyEmail }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const onSendCode = (e: MouseEvent<HTMLButtonElement>) => {
    const email = emailRef.current?.value;
    if (!email) return;
    axios
      .post(
        "http://localhost:3001/api/v1/user/send-mail",
        { email },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((_) => alert("Successfully !!! Please check your email"))
      .catch(console.log);
  };
  const onSubmit = () => {
    if (!codeRef.current?.value) return;
    else {
      const code = codeRef.current.value;
      axios
        .post<object, string>(
          "http://localhost:3001/api/v1/user/verify-email",
          { code },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then(onVerifyEmail)
        .catch(console.log);
    }
  };
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
        <button
          onClick={onCloseLogin}
          type="button"
          title="close"
          className="absolute top-3 right-5"
        >
          X
        </button>
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
          <div className="flex justify-start items-start flex-col gap-y-4  mt-3">
            <div className="bg-[#eff0f3] w-full flex justify-start items-center h-9">
              <div className="w-16 h-full pl-3">
                <span className="text-[11px] leading-9 font-light text-gray-500">
                  电子邮件
                </span>
              </div>
              <div className="flex-1">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="输入电子邮件"
                  className="outline-none bg-transparent border-none rounded-sm font-light text-[11px] text-black px-4 py-2"
                />
              </div>
            </div>
            <div className="bg-[#eff0f3] w-full flex justify-start items-center h-9 ">
              <div className="flex-1">
                <input
                  ref={codeRef}
                  type="text"
                  name="code"
                  id="code"
                  placeholder="输入验证码"
                  className="outline-none bg-transparent border-none rounded-sm font-light text-[11px] text-black px-4 py-2"
                />
              </div>
              <div className="w-16 h-full">
                <button
                  onClick={onSendCode}
                  type="button"
                  title="code"
                  className="text-[10px] w-full h-full font-light text-black pr-2"
                >
                  获取验证码
                </button>
              </div>
            </div>
          </div>
          <div className="w-full mt-9">
            <div className="text-[10px] font-light text-gray-500 flex justify-start items-center gap-x-2">
              <span>同意</span>
              <a href="/">用户协议</a>
              <span>和</span>
              <a href="/">隐私政策</a>
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              title="login"
              className="w-full py-2 text center text-xs text-white opacity-75 bg-fresh_red rounded-sm"
            >
              登录/注册
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
