import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  root?: string;
  className?: string;
  children: ReactNode | ReactNode[];
};
const Modal = ({ root, children, className }: Props) => {
  return createPortal(
    <div
      id="modal"
      className={`${className} z-[999] absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gradient-to-t from-[rgba(0,0,0,0.22)] to-[rgba(0,0,0,0.12)]`}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          {Array.isArray(children) ? children.map((child) => child) : children}
        </div>
      </div>
    </div>,
    document.querySelector(`#${root || "root"}`) as HTMLDivElement
  );
};

export default Modal;
