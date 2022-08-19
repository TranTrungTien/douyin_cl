import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  className?: string;
};

const SideContainer = ({
  children,
  width,
  height = "h-full",
  className,
}: Props) => {
  return (
    <section className={`${width} ${height} ${className}`}>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </section>
  );
};

export default SideContainer;
