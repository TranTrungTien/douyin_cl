import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { servicesPath } from "../../services/services_path";

type Props = {
  children?: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  image?: string;
  firstNickNameCharacter?: string;
  hint?: string;
  borderRadius?: string | number;
  className?: string;
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
  className,
  href,
}: Props) => {
  return (
    <div
      title={title}
      className={`${width} ${height} ${borderRadius} ${className} relative rounded-full overflow-hidden`}
    >
      <Link target={target} to={href}>
        {image ? (
          <img
            src={`${servicesPath.BASE_URL}/${image}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://64.media.tumblr.com/72973457b8e180f1e2a6aff1d90ab638/c7f57df796d723d6-93/s1280x1920/447817b9a0e6a23eaeb830e5ee37cf2379d16efa.jpg";
            }}
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
