import { MouseEvent, useRef, useState } from "react";
import { MessageTransfer } from "../../hooks/use_message";
import { IUser } from "../../interfaces/user.interface";
import { useAppDispatch } from "../../redux/app/hooks";
import { getUserInfoSuccessfully } from "../../redux/slice/user_slice";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import Button from "../button";
import CircleLoading from "../circle_loading";
import Input from "../input";
type ILoginStatus = {
  isSendingCode: boolean;
  isLogging: boolean;
};
type Props = {
  onVerifyEmail: (emailVerified: string, code: string | null) => void;
};
const SubRegisterOrLogin = ({ onVerifyEmail }: Props) => {
  const message = MessageTransfer();
  const dispatch = useAppDispatch();
  const [loginStatus, setLoginStatus] = useState<ILoginStatus>({
    isSendingCode: false,
    isLogging: false,
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const handleSendCode = (e: MouseEvent<HTMLButtonElement>) => {
    setLoginStatus((prev) => {
      return {
        ...prev,
        isSendingCode: true,
      };
    });
    const email = emailRef.current?.value;
    if (!email) return;
    postData(servicesPath.SEND_EMAIL, { email })
      .then((_) => {
        setLoginStatus((prev) => {
          return {
            ...prev,
            isSendingCode: false,
          };
        });
        message.sendMessage("Please check your email", "primary");
      })
      .catch((err) => {
        setLoginStatus((prev) => {
          return {
            ...prev,
            isSendingCode: false,
          };
        });
        message.sendMessage("Something went wrong", "danger");
      });
  };

  const handleSubmit = async () => {
    if (!codeRef.current?.value || !emailRef.current?.value) return;
    else {
      setLoginStatus((prev) => {
        return {
          ...prev,
          isLogging: true,
        };
      });
      const code = codeRef.current.value;
      const email = emailRef.current.value;
      const registerRes = await postData<{
        message: string;
        userEmail: string;
        secretCode: string | null;
        userExisted: boolean;
        code: string | null;
      }>(servicesPath.VERIFY_EMAIL, { code, existedEmail: email }).catch(
        console.error
      );
      if (registerRes && registerRes.data) {
        const { userEmail, secretCode, userExisted, code } = registerRes.data;
        if (userEmail && !userExisted && !secretCode)
          onVerifyEmail(userEmail, code);
        else if (userEmail && userExisted && secretCode) {
          const loginRes = await postData<{ message: string; data: IUser }>(
            servicesPath.LOGIN_WITHOUT_PASSWORD,
            {
              email: userEmail,
              secretCode,
            },
            true
          ).catch((err) => {
            setLoginStatus((prev) => {
              return {
                ...prev,
                isLogging: false,
              };
            });
            message.sendMessage("Something went wrong", "danger");
          });
          setLoginStatus((prev) => {
            return {
              ...prev,
              isLogging: false,
            };
          });
          message.sendMessage("Login Successfully");
          loginRes &&
            loginRes.data &&
            dispatch(getUserInfoSuccessfully(loginRes.data.data));
        }
      }
    }
  };
  return (
    <>
      <div className="flex justify-start items-start flex-col gap-y-4  mt-3">
        <div className="bg-[#eff0f3] w-full flex justify-start items-center h-9">
          <div className="w-16 h-full pl-3">
            <span className="text-xs leading-9 font-light text-gray-500">
              电子邮件
            </span>
          </div>
          <div className="flex-1">
            <Input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              placeholder="输入电子邮件"
              className="inline-block w-full outline-none bg-transparent border-none rounded-sm font-light text-sm text-black px-4 py-2"
            />
          </div>
        </div>
        <div className="bg-[#eff0f3] w-full flex justify-start items-center h-9 ">
          <div className="flex-1">
            <Input
              ref={codeRef}
              type="text"
              name="code"
              id="code"
              placeholder="输入验证码"
              className="inline-block w-full outline-none bg-transparent border-none rounded-sm font-light text-sm text-black px-4 py-2"
            />
          </div>
          <div className="w-auto h-full">
            <Button
              text="获取验证码"
              onClick={handleSendCode}
              type="button"
              title="code"
              className="text-[11px] mr-1 w-full h-full font-light text-black pr-2"
              suffixIcon={
                loginStatus.isSendingCode && (
                  <CircleLoading strokeColor="red" height={20} width={20} />
                )
              }
            />
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
        <Button
          text="登录/注册"
          onClick={handleSubmit}
          classNameInnerText="mr-3"
          suffixIcon={
            loginStatus.isLogging && (
              <CircleLoading strokeColor="white" height={20} width={20} />
            )
          }
          type="submit"
          title="login"
          className="w-full py-2 text center text-xs text-white opacity-75 bg-fresh_red rounded-sm"
        />
      </div>
    </>
  );
};

export default SubRegisterOrLogin;
