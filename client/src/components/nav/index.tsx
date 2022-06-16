import { Link } from "react-router-dom";
import Button from "../button";

type Props = {};

const Nav = (props: Props) => {
  return (
    <ul className="flex justify-between items-center">
      <li className="opacity-80 hover:opacity-100 cursor-pointer ">
        <span>关于抖音</span>
      </li>
      <li className="opacity-80 hover:opacity-100 cursor-pointer ml-8">
        <span>创作者服务</span>
      </li>
      <li className="ml-8 relative">
        <Link to="/upload">
          {/* <div className="absolute top-0 z-[-1] -left-px w-[3px] h-full bg-bright_blue"></div> */}
          <div className="bg-light_blue flex justify-center item-center border-2 border-white w-[104px] h-[38px] rounded-[5px] before:absolute before:top-0 before:z-[-1] before:-right-[3px] before:w-full before:rounded-[5px]  before:h-full before:bg-fresh_red after:absolute after:top-0 after:z-[-1] after:-left-[3px] after:w-full after:rounded-[5px] after:h-full after:bg-bright_blue">
            <span className="leading-9 text-lg mr-2">+</span>
            <span className="leading-9">发布视频</span>
          </div>
          {/* <div className="absolute top-0 z-[-1] -right-px w-[3px] h-full bg-fresh_red"></div> */}
        </Link>
      </li>
      <li className="ml-8">
        <Button
          onClick={() => {}}
          text="登录"
          backgroundColor="bg-fresh_red"
          borderRadius="rounded-[5px]"
          width="w-[104px]"
          height="h-[38px]"
          px="px-4"
          styleArray="font-medium leading-[23px] border border-fresh_red flex justify-center items-center text-white"
        />
      </li>
    </ul>
  );
};

export default Nav;
