import { ReactNode } from "react";

type Props = {
  children?: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  image: string;
  hint?: string;
  borderRadius?: string | number;
  styleArray?: string;
  href: string;
};

const AvatarCardLink = ({
  children,
  width = "w-10",
  height = "h-10",
  image,
  hint,
  borderRadius = "rounded-full",
  styleArray,
  href,
}: Props) => {
  return (
    <div
      className={`${width} ${height} ${borderRadius} ${styleArray} relative`}
    >
      <a href={href}>
        <img
          src={image}
          alt={hint}
          className="w-full h-full object-cover object-center rounded-full block"
        />
      </a>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default AvatarCardLink;
