import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
};

const VideoAction = ({ children }: Props) => {
  return (
    <>{Array.isArray(children) ? children.map((child) => child) : children}</>
  );
};

export default VideoAction;
