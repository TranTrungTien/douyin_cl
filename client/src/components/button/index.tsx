import { HTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = {
  title?: string;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  classNameInnerText?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
} & HTMLAttributes<HTMLButtonElement>;

const Button = ({
  text,
  title,
  icon,
  className = "text-white",
  type = "button",
  classNameInnerText,
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
      {(icon || text) && (
        <div className={`${icon && "flex justify-center items-center"}`}>
          {icon}
          <span className={classNameInnerText}>{text}</span>
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
