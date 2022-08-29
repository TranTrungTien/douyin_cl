import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const RightContainer = ({ children }: Props) => {
  return (
    <section className="laptop:w-[30%] h-full bg-darkslategray3 rounded-md overflow-hidden">
      <div className="flex flex-col justify-start items-start w-full h-full overflow-hidden">
        {children}
      </div>
    </section>
  );
};

export default RightContainer;
