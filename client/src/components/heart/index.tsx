import { MouseEvent, useEffect, useState } from "react";

type Props = {
  likedCount?: number;
  className?: string;
  isLiked?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>, liked: boolean) => void;
};

const Heart = ({ likedCount, className, isLiked, onClick }: Props) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(isLiked ? true : false);
  }, [isLiked]);
  const handleLiked = (event: MouseEvent<HTMLButtonElement>) => {
    setLiked(!liked);
    onClick && onClick(event, !liked);
  };
  return (
    <button
      onClick={handleLiked}
      className={`${className} flex justify-start items-center space-x-px hover:text-fresh_red ${
        liked && "text-fresh_red"
      }`}
    >
      <svg
        width="20"
        height="20"
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.836 7C9.49 7 6 10.726 6 15.064c0 .108.002.194.003.253a1.62 1.62 0 00-.003.14c.013.582.146 1.284.293 1.87.143.572.344 1.208.57 1.668.907 1.952 2.495 3.846 4.023 5.402a46.034 46.034 0 005.138 4.51l.03.025.023.018c.339.34 1.055 1.05 2.331 1.05h.038c.361 0 1.224 0 1.996-.752l.063-.053.273-.227.006-.005c.847-.698 2.828-2.33 4.782-4.301 1.25-1.254 2.547-2.71 3.538-4.214.135-.204.265-.41.388-.617.049-.08.09-.166.123-.255.044-.115.065-.16.082-.194.019-.037.05-.093.131-.219.057-.089.106-.183.145-.281.055-.14.095-.235.127-.299l.006-.013a1.62 1.62 0 00.285-.562c.243-.863.41-1.623.426-2.558 0-.043 0-.086-.003-.129a10.365 10.365 0 00.003-.31C30.788 10.697 27.308 7 22.98 7c-1.641 0-3.238.508-4.498 1.532C17.119 7.545 15.547 7 13.836 7zm13.744 8.066v.042l-.002.15v.008l-.002.137c0 .015 0 .041.002.074-.014.44-.084.837-.233 1.402a3.667 3.667 0 00-.151.278c-.064.13-.122.265-.174.39a4.472 4.472 0 00-.376.738c-.076.125-.156.25-.24.378l-.002.002c-.823 1.25-1.954 2.534-3.13 3.713l-.003.003c-1.835 1.851-3.712 3.4-4.55 4.09l-.062.051-.235.195-.092-.091a3.812 3.812 0 00-.294-.254l-.012-.01a42.76 42.76 0 01-4.82-4.226l-.006-.006c-1.452-1.477-2.736-3.062-3.406-4.512a1.665 1.665 0 00-.021-.046c-.075-.15-.213-.533-.338-1.033a6.736 6.736 0 01-.193-1.074 1.837 1.837 0 000-.2v-.008a6.941 6.941 0 01-.003-.193c0-2.667 2.154-4.827 4.6-4.827 1.285 0 2.5.523 3.588 1.653a1.618 1.618 0 002.491-.193c.642-.914 1.732-1.46 3.064-1.46 2.444 0 4.6 2.162 4.6 4.827v.002z"
          fillOpacity="0.9"
        ></path>
      </svg>
      <span>{likedCount && likedCount}</span>
    </button>
  );
};

export default Heart;
