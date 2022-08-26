import { SyntheticEvent } from "react";
import { IUser } from "../../interfaces/user.interface";
import { useAppDispatch } from "../../redux/app/hooks";
import { getUserInfoSuccessfully } from "../../redux/slice/user_slice";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import Button from "../button";
import Input from "../input";

type Props = {
  emailVerified: string;
  code: string;
};
const BasicInfo = ({ emailVerified, code }: Props) => {
  const dispatch = useAppDispatch();
  const onSubmit = async (e: SyntheticEvent) => {
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
      const userDataRes = await postData<{ message: string; doc: IUser }>(
        servicesPath.CREATE_USER,
        { user }
      ).catch(console.error);
      const emailRes = userDataRes && userDataRes.data.doc.email;
      const passwordRes = userDataRes && userDataRes.data.doc.password;

      const loginRes = await postData<{ message: string; doc: IUser }>(
        servicesPath.LOGIN,
        { emailRes, passwordRes, code },
        true
      ).catch(console.error);
      loginRes && dispatch(getUserInfoSuccessfully(loginRes.data.doc));
    }
  };
  return (
    <div className="w-96 h-96 bg-white">
      <form onSubmit={onSubmit} className="flex flex-col">
        <label htmlFor="nickname">NickName</label>
        <input />
        <Input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="nick name"
        />
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" name="email" placeholder="email" />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <Button text="Submit" type="submit" />
      </form>
    </div>
  );
};

export default BasicInfo;
