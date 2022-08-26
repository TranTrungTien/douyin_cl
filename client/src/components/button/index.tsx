import { HTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = {
  title?: string;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  text,
  title,
  icon,
  className = "text-white",
  type = "button",
  children,
  onClick,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      title={title}
      onClick={onClick}
      type={type}
      className={`${className} leading-5`}
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
