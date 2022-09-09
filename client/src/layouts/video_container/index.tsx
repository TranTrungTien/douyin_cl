import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
} & HTMLAttributes<HTMLDivElement>;
const VideoContainer = ({ children, ...props }: Props) => {
  return (
    <div {...props}>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default VideoContainer;
