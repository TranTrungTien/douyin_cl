import React from "react";
type Props = {
  widthSvg?: number;
  heightSvg?: number;
};
const ShareIcon = ({ heightSvg, widthSvg }: Props) => {
  return (
    <div>
      <svg
        width={`${widthSvg}`}
        height={`${heightSvg}`}
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.884 9.417c-1.209-1.157-3.214-.3-3.214 1.373v2.396c-.132 0-.263.001-.393.004-1.402-.039-6.254.115-9.667 3.775-2.361 2.532-3.423 6.562-3.357 8.64-.062 2.075.905 1.888 1.165 1.41 2.976-5.46 12.252-3.79 12.252-3.79v2.265c0 1.637 1.932 2.508 3.159 1.424l7.989-7.059a1.9 1.9 0 00.055-2.797l-7.99-7.641z"
          fillOpacity="1"
        ></path>
      </svg>
    </div>
  );
};

export default ShareIcon;
