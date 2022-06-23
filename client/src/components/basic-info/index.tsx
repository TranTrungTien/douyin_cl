import axios from "axios";
import { SyntheticEvent } from "react";

type Props = {
  emailVerified: string;
};
const BasicInfo = ({ emailVerified }: Props) => {
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
        .post(
          "http://localhost:3001/api/v1/user/save",
          { user },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(console.log)
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
