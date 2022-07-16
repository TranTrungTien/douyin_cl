import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const RightContainer = ({ children }: Props) => {
  return (
    <section className="laptop:max-w-[300px] desktop:max-w-[440px] extra-desktop:max-w-[500px] laptop:w-[300px] desktop:w-[440px] extra-desktop:w-[500px] h-full bg-darkslategray3 rounded-md overflow-hidden">
      <div className="flex flex-col justify-start items-start w-full h-full overflow-hidden">
        {children}
      </div>
    </section>
  );
};

export default RightContainer;
