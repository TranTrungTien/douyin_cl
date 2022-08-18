import React, { FormEvent, SyntheticEvent } from "react";

type Props = {
  name?: string;
  placeholder?: string;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
  onSubmit?: (e: SyntheticEvent) => void;
};
const Input = ({ onSubmit, onChange }: Props) => {
  return (
    <div className="w-full">
      <form autoComplete="off" className="w-full py-1" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          className="w-full bg-darkslategray px-4 py-3 rounded-sm border border-darkslategray2 text-gray-300 text-sm font-medium outline-none"
          autoComplete="off"
          name="comment"
          id="comment"
          placeholder="评论 ..."
        />
      </form>
    </div>
  );
};

export default Input;
