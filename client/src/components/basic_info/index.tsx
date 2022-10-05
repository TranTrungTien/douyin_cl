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
      const userDataRes = await postData<{ message: string; data: IUser }>(
        servicesPath.CREATE_USER,
        { user }
      ).catch(console.error);
      const emailRes = userDataRes && userDataRes.data.data.email;
      const passwordRes = userDataRes && userDataRes.data.data.password;

      const loginRes = await postData<{ message: string; data: IUser }>(
        servicesPath.LOGIN,
        { emailRes, passwordRes, code },
        true
      ).catch(console.error);
      loginRes && dispatch(getUserInfoSuccessfully(loginRes.data.data));
    }
  };
  return (
    <div className="w-[30vw] min-h-[550px] bg-white p-10 rounded shadow-lg">
      <h3 className="font-semibold text-3xl leading-[65px]">Who You Are ?</h3>
      <form onSubmit={onSubmit} className="flex flex-col">
        <label
          className="font-semibold text-black opacity-80 mb-2"
          htmlFor="nickname"
        >
          NickName
        </label>
        <Input
          className="bg-transparent rounded text-sm text-black opacity-80 mb-5 hover:border-red_hover focus:shadow-md focus:outline-none shadow-red-700"
          type="text"
          id="nickname"
          name="nickname"
          placeholder="nick name"
        />
        <label
          className="font-semibold text-black opacity-80 mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          className="bg-transparent rounded text-sm text-black opacity-80 mb-5 hover:border-red_hover focus:shadow-md focus:outline-none shadow-red-700"
          type="email"
          id="email"
          name="email"
          placeholder="email"
        />
        <label
          className="font-semibold text-black opacity-80 mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <Input
          className="bg-transparent rounded text-sm text-black opacity-80 mb-5 hover:border-red_hover focus:shadow-md focus:outline-none shadow-red-700"
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <Button
          text="Submit"
          type="submit"
          className="text-white font-semibold bg-fresh_red rounded w-full py-4 mt-3"
        />
      </form>
    </div>
  );
};

export default BasicInfo;
