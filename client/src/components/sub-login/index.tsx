import axios, { AxiosResponse } from "axios";
import { MouseEvent, useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { IUser } from "../../interfaces/user.interface";
import { saveUser } from "../../slice/user.slice";

type Props = {
  onVerifyEmail: (emailVerified: string) => void;
};
const SubRegisterOrLogin = ({ onVerifyEmail }: Props) => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const onSendCode = (e: MouseEvent<HTMLButtonElement>) => {
    const email = emailRef.current?.value;
    if (!email) return;
    axios
      .post(
        "user/send-mail",
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
    if (!codeRef.current?.value || !emailRef.current?.value) return;
    else {
      const code = codeRef.current.value;
      const email = emailRef.current.value;
      axios
        .post<
          any,
          AxiosResponse<
            {
              message: string;
              userEmail: string;
              secretCode: string | null;
              userExisted: boolean;
            },
            any
          >
        >(
          "user/verify-email",
          { code, existedEmail: email },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((data) => {
          const { userEmail, secretCode, userExisted } = data.data;
          console.log(userEmail, secretCode, userExisted);

          if (userEmail && !userExisted && !secretCode)
            onVerifyEmail(userEmail);
          else if (userEmail && userExisted && secretCode) {
            axios
              .post<any, AxiosResponse<{ message: string; doc: IUser }, any>>(
                "user/login-without-password",
                { email: userEmail, secretCode },
                {
                  headers: {
                    "content-type": "application/json",
                  },
                  withCredentials: true,
                }
              )
              .then((data) => {
                dispatch(saveUser(data.data.doc));
              });
          }
        })
        .catch(console.log);
    }
  };
  return (
    <>
      <div className="flex justify-start items-start flex-col gap-y-4  mt-3">
        <div className="bg-[#eff0f3] w-full flex justify-start items-center h-9">
          <div className="w-16 h-full pl-3">
            <span className="text-[11px] leading-9 font-light text-gray-500">
              ????????????
            </span>
          </div>
          <div className="flex-1">
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              required
              placeholder="??????????????????"
              className="inline-block w-full outline-none bg-transparent border-none rounded-sm font-light text-[11px] text-black px-4 py-2"
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
              placeholder="???????????????"
              className="inline-block w-full outline-none bg-transparent border-none rounded-sm font-light text-[11px] text-black px-4 py-2"
            />
          </div>
          <div className="w-16 h-full">
            <button
              onClick={onSendCode}
              type="button"
              title="code"
              className="text-[10px] w-full h-full font-light text-black pr-2"
            >
              ???????????????
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-9">
        <div className="text-[10px] font-light text-gray-500 flex justify-start items-center gap-x-2">
          <span>??????</span>
          <a href="/">????????????</a>
          <span>???</span>
          <a href="/">????????????</a>
        </div>
        <button
          onClick={onSubmit}
          type="submit"
          title="login"
          className="w-full py-2 text center text-xs text-white opacity-75 bg-fresh_red rounded-sm"
        >
          ??????/??????
        </button>
      </div>
    </>
  );
};

export default SubRegisterOrLogin;
