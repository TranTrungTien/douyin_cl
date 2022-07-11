import React, { SyntheticEvent } from "react";

type Props = {
  onSubmit: (e: SyntheticEvent) => void;
};
const Input = ({ onSubmit }: Props) => {
  return (
    <div className="w-full">
      <form autoComplete="off" className="w-full py-1" onSubmit={onSubmit}>
        <input
          type="text"
          className="w-full bg-darkslategray px-4 py-3 rounded-sm border border-darkslategray2 text-gray-300 text-sm font-medium outline-none"
          autoComplete="false"
          name="comment"
          id="comment"
        />
      </form>
    </div>
  );
};

export default Input;
