import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  bottom?: string;
  left?: string;
  px?: string;
  pb?: string;
};
const VideoCardFooter = ({
  children,
  bottom = "bottom-0",
  left = "left-0",
  px = "px-0",
  pb = "pb-0",
}: Props) => {
  return (
    <div
      className={`w-full h-[25px] flex justify-between items-center absolute ${bottom} ${left} w-full ${px} ${pb}`}
    >
      <div className="w-full h-full relative">
        {Array.isArray(children) ? children.map((child) => child) : children}
      </div>
    </div>
  );
};

export default VideoCardFooter;
