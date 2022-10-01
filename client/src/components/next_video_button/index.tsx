import { MouseEvent } from "react";
import Button from "../button";

type Props = {
  onChangeVideo?: (isNextAction: boolean) => void;
};
const NextVideoButton = ({ onChangeVideo }: Props) => {
  const handleChangeVideo = (
    e: MouseEvent<HTMLButtonElement>,
    isNextAction: boolean
  ) => {
    e.stopPropagation();
    onChangeVideo && onChangeVideo(isNextAction);
  };
  return (
    <div className="flex flex-col justify-center items-start bg-gray_button opacity-30 rounded-full max-w-max hover:opacity-70">
      <Button
        text=""
        onClick={(e) => handleChangeVideo(e, false)}
        className="inline-block px-[6px] py-2 hover:opacity-100"
        icon={
          <svg
            width="26"
            height="26"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            viewBox="0 0 36 36"
          >
            <path d="M10.065 22.592a1.928 1.928 0 010-2.728l7-7a1.928 1.928 0 012.728 0l.015.016 6.985 6.984a1.928 1.928 0 11-2.727 2.728l-5.637-5.637-5.637 5.637a1.928 1.928 0 01-2.727 0z"></path>
          </svg>
        }
      />
      <Button
        text=""
        onClick={(e) => handleChangeVideo(e, true)}
        className="inline-block px-[6px] py-2 hover:opacity-100"
        icon={
          <svg
            width="26"
            height="26"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
            viewBox="0 0 36 36"
          >
            <path d="M10.065 12.864a1.928 1.928 0 000 2.727l7 7a1.929 1.929 0 002.728 0l.015-.015 6.985-6.985a1.928 1.928 0 10-2.727-2.727L18.429 18.5l-5.637-5.637a1.928 1.928 0 00-2.727 0z"></path>
          </svg>
        }
      />
    </div>
  );
};

export default NextVideoButton;
