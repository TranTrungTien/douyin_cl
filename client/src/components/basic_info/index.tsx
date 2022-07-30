import axios, { AxiosResponse } from "axios";
import { SyntheticEvent } from "react";
import { useAppDispatch } from "../../redux/app/hooks";
import { IUser } from "../../interfaces/user.interface";
import { getUserInfoSuccessfully } from "../../redux/slice/user.slice";

type Props = {
  emailVerified: string;
  code: string;
};
const BasicInfo = ({ emailVerified, code }: Props) => {
  const dispatch = useAppDispatch();
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      nickname: { value: string };
      email: { value: string };
      password: { value: string };
    };
    const nickname = target.nickname.value;
    const email = target.email.value;
    const password = target.password.value;
    if (!nickname || !email || !password) return;
    else {
      const user = { nickname: nickname, email: email, password: password };
      axios
        .post<any, AxiosResponse<{ message: string; doc: IUser }>>(
          "user/save",
          { user },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((user) => {
          const email = user.data.doc.email;
          const password = user.data.doc.password;
          axios
            .post<{ message: string; doc: IUser }>(
              "user/login",
              { email, password, code },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            .then((userLogin) =>
              dispatch(getUserInfoSuccessfully(userLogin.data.doc))
            );
        })
        .catch(console.error);
    }
  };
  return (
    <div className="w-96 h-96 bg-white">
      <form onSubmit={onSubmit} className="flex flex-col">
        <label htmlFor="nickname">NickName</label>
        <input type="text" id="nickname" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" defaultValue={emailVerified} />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BasicInfo;
