import { ReactNode } from "react";
import { RightBarAction } from "../../layouts/video_slide";
import { servicesPath } from "../../services/services_path";

type Props = {
  children?: ReactNode[] | ReactNode;
  width?: string;
  title?: string;
  height?: string;
  image: string;
  hint?: string;
  borderRadius?: string | number;
  className?: string;
  firstNickNameCharacter: string;
  onOpenRightBar?: (action: RightBarAction) => void;
};
//
const AvatarCardButton = ({
  title,
  firstNickNameCharacter,
  children,
  width = "w-10",
  height = "h-10",
  image,
  hint,
  borderRadius = "rounded-full",
  className,
  onOpenRightBar,
}: Props) => {
  const handleOpenRightBar = () => {
    onOpenRightBar &&
      onOpenRightBar({ comment: false, isOpen: true, user: true });
  };
  return (
    <div className={`${width} ${height} ${borderRadius} ${className} relative`}>
      <button
        type="button"
        title={title}
        className={`${width} ${height} ${borderRadius}`}
        onClick={handleOpenRightBar}
      >
        {image ? (
          <img
            src={`${servicesPath.BASE_URL}/${image}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://64.media.tumblr.com/72973457b8e180f1e2a6aff1d90ab638/c7f57df796d723d6-93/s1280x1920/447817b9a0e6a23eaeb830e5ee37cf2379d16efa.jpg";
            }}
            alt={hint}
            className="w-full h-full object-cover object-center rounded-full block"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 rounded-full grid place-content-center">
            <span className="text-white font-bold text-2xl">
              {firstNickNameCharacter}
            </span>
          </div>
        )}
      </button>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default AvatarCardButton;
