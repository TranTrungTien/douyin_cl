import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  gapX?: string;
  gapY?: string;
  py?: string;
  px?: string;
  gridCol?: string;
};
const VideoContainer = ({
  children,
  py = "py-0",
  px = "px-0",
  gapY = "gap-y-0",
  gapX = "gap-x-0",
  gridCol = "2xl:grid-cols-3",
}: Props) => {
  return (
    <div className={`grid ${gridCol} ${py} ${px} ${gapX} ${gapY}`}>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default VideoContainer;
