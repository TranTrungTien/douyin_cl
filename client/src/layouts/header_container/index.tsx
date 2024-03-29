import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  backgroundColor?: string;
  className?: string;
  classNameInner?: string;
  fromHomePage?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;
const HeaderContainer = ({
  fromHomePage,
  children,
  classNameInner = "justify-between items-center",
  backgroundColor = "bg-light_blue",
  className,
  ...props
}: Props) => {
  return (
    <header
      {...props}
      className={`z-10 sticky top-0 right-0 w-full text-[#ffffff] leading-24px text-sm font-medium border-b border-darkslategray laptop:px-[20px] desktop:px-[30px] ${className} ${backgroundColor}`}
    >
      <div className={`flex ${classNameInner}`}>
        {Array.isArray(children) ? children.map((child) => child) : children}
      </div>
      {fromHomePage && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2  bg-[#292b35] w-28 h-4 rounded-bl-xl rounded-br-xl">
          <div className="relative inline-block w-[10px] h-[10px] left-1/2 -top-2 -translate-x-1/2 border-b-[0.1em]  border-r-[0.1em] border-white rotate-45"></div>
        </div>
      )}
    </header>
  );
};

export default HeaderContainer;
