import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
};

const RelatedVideoContainer = ({ children }: Props) => {
  return (
    <section className="w-full h-auto">
      {Array.isArray(children) ? children.map((child) => child) : children}
    </section>
  );
};

export default RelatedVideoContainer;
