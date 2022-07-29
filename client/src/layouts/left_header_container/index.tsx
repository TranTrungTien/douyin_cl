import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
};
const LeftHeaderContainer = ({ children }: Props) => {
  return (
    <div className="flex justify-start items-center space-x-20">
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default LeftHeaderContainer;
