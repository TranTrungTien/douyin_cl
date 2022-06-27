import { ReactNode } from "react";
import { RightBarAction } from "../../layouts/videoslide";

type Props = {
  children?: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  image: string;
  hint?: string;
  borderRadius?: string | number;
  styleArray?: string;
  handleOpenRightBar?: (action: RightBarAction) => void;
};
//
const AvatarCardButton = ({
  children,
  width = "w-10",
  height = "h-10",
  image,
  hint,
  borderRadius = "rounded-full",
  styleArray,
  handleOpenRightBar,
}: Props) => {
  const onOpenRightBar = () => {
    if (!handleOpenRightBar) return;
    handleOpenRightBar({ comment: false, isOpen: true, user: true });
  };
  return (
    <div
      className={`${width} ${height} ${borderRadius} ${styleArray} relative`}
    >
      <button
        type="button"
        title="User"
        className={`${width} ${height} ${borderRadius}`}
        onClick={onOpenRightBar}
      >
        <img
          src={image}
          alt={hint}
          className="w-full h-full object-cover object-center rounded-full block"
        />
      </button>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default AvatarCardButton;
