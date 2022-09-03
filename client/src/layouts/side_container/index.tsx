import { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  className?: string;
} & HTMLAttributes<HTMLElement>;

const SideContainer = ({
  children,
  width,
  height = "h-full",
  className,
  ...props
}: Props) => {
  return (
    <section className={`${width} ${height} ${className}`} {...props}>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </section>
  );
};

export default SideContainer;
