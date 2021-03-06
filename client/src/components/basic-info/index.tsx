import axios, { AxiosResponse } from "axios";
import { SyntheticEvent } from "react";
import { IUser } from "../../interfaces/user.interface";

type Props = {
  emailVerified: string;
};
const BasicInfo = ({ emailVerified }: Props) => {
  console.log(emailVerified);

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
            .post(
              "user/login",
              { email, password },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            .then((userLogin) => console.log(userLogin.data));
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
