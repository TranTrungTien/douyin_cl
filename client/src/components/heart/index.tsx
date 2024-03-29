import { MouseEvent, ReactNode } from "react";
import Button from "../button";

type Props = {
  likedCount?: number;
  className?: string;
  isLiked?: boolean;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
};

const Heart = ({
  likedCount,
  className = "flex justify-start items-center space-x-px",
  title,
  icon,
  isLiked,
  children,
  onClick,
}: Props) => {
  const handleLiked = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick && onClick();
  };
  return (
    <Button
      text=""
      title={title}
      onClick={handleLiked}
      className={`${className}  hover:text-fresh_red ${
        isLiked && "text-fresh_red"
      }`}
    >
      {icon}
      {children}
      <span>{likedCount && likedCount}</span>
    </Button>
  );
};

export default Heart;
