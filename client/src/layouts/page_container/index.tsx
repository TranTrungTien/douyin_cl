import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  backgroundColor?: string;
  className?: string;
};
// h-[calc(100vh-60px)] min-h-[calc(100vh-60px)]

const PageContainer = ({
  children,
  backgroundColor = "bg-light_blue",
  className,
}: Props) => {
  return (
    <div
      className={`${backgroundColor} ${className} w-full h-full flex justify-center items-start`}
    >
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default PageContainer;
