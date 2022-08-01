import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  image?: string;
  firstNickNameCharacter?: string;
  hint?: string;
  borderRadius?: string | number;
  styleArray?: string;
  href: string;
  title?: string;
  target?: string;
};

const AvatarCardLink = ({
  target,
  children,
  title,
  width = "w-10",
  height = "h-10",
  firstNickNameCharacter,
  image,
  hint,
  borderRadius = "rounded-full",
  styleArray,
  href,
}: Props) => {
  return (
    <div
      title={title}
      className={`${width} ${height} ${borderRadius} ${styleArray} relative rounded-full overflow-hidden`}
    >
      <Link target={target} to={href}>
        {image ? (
          <img
            src={image}
            alt={hint}
            className="w-full h-full object-cover object-center block"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 grid place-content-center">
            <span className="text-2xl font-bold text-white">
              {firstNickNameCharacter}
            </span>
          </div>
        )}
      </Link>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default AvatarCardLink;
