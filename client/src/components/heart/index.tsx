import { MouseEvent, ReactNode, useEffect, useState } from "react";
import Button from "../button";

type Props = {
  likedCount?: number;
  className?: string;
  isLiked?: boolean;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>, liked: boolean) => void;
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
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(isLiked ? true : false);
  }, [isLiked]);
  const handleLiked = (event: MouseEvent<HTMLButtonElement>) => {
    setLiked(!liked);
    onClick && onClick(event, !liked);
  };
  return (
    <Button
      width="w-auto"
      height="h-auto"
      text=""
      backgroundColor="bg-transparent"
      title={title}
      onClick={handleLiked}
      className={`${className}  hover:text-fresh_red ${
        liked && "text-fresh_red"
      }`}
    >
      {icon}
      {children}
      <span>{likedCount && likedCount}</span>
    </Button>
  );
};

export default Heart;
