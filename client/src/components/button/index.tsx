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
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
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
  className = "text-white",
  type = "button",
  children,
  onClick,
}: Props) => {
  return (
    <button
      title={title}
      onClick={onClick}
      type={type}
      className={`${backgroundColor} ${height} ${width} ${fontSize} ${lineHeight} ${py} ${px} ${borderRadius} ${className}`}
    >
      <div className={`${icon && "flex justify-center items-center"}`}>
        {icon}
        <span> {text}</span>
      </div>
      {children}
    </button>
  );
};

export default Button;
