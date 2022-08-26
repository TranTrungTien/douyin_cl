import React, { FormEvent, forwardRef, ReactNode, SyntheticEvent } from "react";

type Props = {
  name?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  id?: string;
  autoComplete?: "on" | "off";
  children?: ReactNode;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
};
const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      autoComplete = "off",
      type,
      className,
      id,
      name,
      placeholder,
      onChange,
      children,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <div className="w-full">
        <input
          {...props}
          ref={ref}
          onChange={onChange}
          type={type}
          className={`w-full bg-darkslategray px-4 py-3 rounded-sm border border-darkslategray2 text-gray-300 text-sm font-medium outline-none ${className}`}
          autoComplete={autoComplete}
          name={name}
          id={id}
          placeholder={placeholder}
        >
          {children}
        </input>
      </div>
    );
  }
);
export default Input;
