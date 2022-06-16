import { Link } from "react-router-dom";

type Props = {
  py?: string;
};

const Logo = ({ py = "py-3" }: Props) => {
  return (
    <div className={`flex justify-center items-center ${py} cursor-pointer`}>
      <Link to="/">
        <img
          className="block w-auto h-auto object-cover object-center"
          src="/images/douyin_logo.svg"
          alt="Logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
