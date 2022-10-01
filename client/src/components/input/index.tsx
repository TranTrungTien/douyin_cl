import { FormEvent, forwardRef, HTMLAttributes, ReactNode } from "react";

type Props = {
  name?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  id?: string;
  value?: string;
  autoComplete?: "on" | "off";
  children?: ReactNode;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
} & HTMLAttributes<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      autoComplete = "off",
      type,
      className,
      id,
      name,
      placeholder,
      value,
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
          defaultValue={value}
          ref={ref}
          onChange={onChange}
          type={type}
          className={`w-full px-4 py-3 rounded-sm border border-darkslategray2 text-sm font-medium outline-none ${className}`}
          autoComplete={autoComplete}
          name={name}
          id={id}
          placeholder={placeholder}
        />
        {children}
      </div>
    );
  }
);
export default Input;
