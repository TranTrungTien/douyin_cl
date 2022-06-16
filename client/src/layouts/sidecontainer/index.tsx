import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  styleArray?: string;
};

const SideContainer = ({
  children,
  width = "w-0",
  height = "h-full",
  styleArray,
}: Props) => {
  return (
    <section className={`${width} ${height} ${styleArray}`}>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </section>
  );
};

export default SideContainer;
