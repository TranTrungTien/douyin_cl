import { MouseEvent, ReactNode } from "react";

type Props = {
  title?: string;
  text: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  lineHeight?: string;
  borderRadius?: string;
  px?: string;
  py?: string;
  border?: string;
  borderColor?: string;
  type?: "button" | "submit" | "reset" | undefined;
  styleArray?: string;
  icon?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  text,
  title,
  fontSize = "text-sm",
  lineHeight = "leading-5",
  backgroundColor = "bg-fresh_red",
  height = "h-36px",
  width = "w-88px",
  borderRadius = "rounded-md",
  px = "px-0",
  py = "py-0",
  icon,
  styleArray = "text-white",
  type = "button",
  onClick,
}: Props) => {
  return (
    <button
      title={title}
      onClick={onClick}
      type={type}
      className={`${backgroundColor} ${height} ${width} ${fontSize} ${lineHeight} ${py} ${px} ${borderRadius} ${styleArray}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
