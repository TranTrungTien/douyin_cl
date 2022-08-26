import { MouseEvent } from "react";
import Button from "../button";

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};
const Plus = ({ onClick }: Props) => {
  return (
    <Button
      text=""
      onClick={onClick}
      className="w-5 h-5 absolute -bottom-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 rounded-full bg-fresh_red flex justify-center items-center"
    >
      <span className="text-white font-extralight inline-block leading-[22px] w-full h-full text-center">
        +
      </span>
    </Button>
  );
};

export default Plus;
