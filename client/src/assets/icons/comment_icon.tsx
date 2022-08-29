import React from "react";
type Props = {
  widthSvg?: number;
  heightSvg?: number;
};
const CommentIcon = ({ heightSvg, widthSvg }: Props) => {
  return (
    <svg
      width={`${widthSvg}`}
      height={`${heightSvg}`}
      className="fill-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.25 16.71c0 2.712-1.304 5.04-3.536 7.275-.196.197-.404.392-.62.584-1.953 2.171-3.86 3.437-5.583 3.94-2.243.657-1.376-2.42-1.348-2.518v-.002c-6.214 0-11.413-3.777-11.413-9.278S11.787 6.75 18 6.75c6.214 0 11.25 4.46 11.25 9.96zm-16.715 1.85c.888 0 1.608-.715 1.608-1.597 0-.88-.72-1.595-1.608-1.595-.887 0-1.607.714-1.607 1.595 0 .882.72 1.596 1.607 1.596zm7.072-1.597c0 .882-.72 1.596-1.607 1.596a1.602 1.602 0 01-1.608-1.596c0-.88.72-1.595 1.608-1.595.887 0 1.607.714 1.607 1.595zm3.857 1.596c.888 0 1.607-.714 1.607-1.596a1.6 1.6 0 00-1.607-1.595c-.887 0-1.607.714-1.607 1.595 0 .882.72 1.596 1.607 1.596z"
        fillOpacity="1"
      ></path>
    </svg>
  );
};

export default CommentIcon;
