import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = { children: ReactNode | ReactNode[] };
const Modal = ({ children }: Props) => {
  return createPortal(
    <div
      id="modal"
      className="z-10 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gradient-to-t from-[rgba(0,0,0,0.12)] to-[rgba(0,0,0,0.12)]"
    >
      <div className="w-246px h-64 rounded-md bg-white">{children},</div>
    </div>,
    document.querySelector("#root") as HTMLDivElement
  );
};

export default Modal;
