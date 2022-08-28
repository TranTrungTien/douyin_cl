import { FormEvent, forwardRef } from "react";

type Props = {
  name?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  id?: string;
  value?: string;
  autoComplete?: "on" | "off";
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
      value,
      onChange,
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
          className={`w-full bg-darkslategray px-4 py-3 rounded-sm border border-darkslategray2 text-gray-300 text-sm font-medium outline-none ${className}`}
          autoComplete={autoComplete}
          name={name}
          id={id}
          placeholder={placeholder}
        />
      </div>
    );
  }
);
export default Input;
