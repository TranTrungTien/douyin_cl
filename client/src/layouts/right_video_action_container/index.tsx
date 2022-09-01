import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
};

const RightVideoAction = ({ children }: Props) => {
  return (
    <div className="action_bar absolute right-3 z-[23] w-auto h-full text-white flex flex-col laptop:justify-start desktop:justify-center items-center max-w-max desktop:space-y-6 laptop:top-3 desktop:top-auto laptop:space-y-3">
      {/* Like, share, subscribe action, ect,..., */}
      {/* next, pre button */}
      {/* like share, cmt,.,,, */}
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default RightVideoAction;
