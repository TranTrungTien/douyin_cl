import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
};

const RightVideoAction = ({ children }: Props) => {
  return (
    <div className="action_bar absolute right-3 bottom-0 w-auto h-full text-white flex flex-col justify-center items-center max-w-max space-y-6">
      {/* Like, share, subscribe action, ect,..., */}
      {/* next, pre button */}
      {/* like share, cmt,.,,, */}
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default RightVideoAction;
