import { MouseEvent } from "react";
import { RightBarAction } from "../../layouts/video_slide";
import Button from "../button";

type Props = {
  fromVideoPage?: boolean;
  commentsCount?: number;
  onCloseComment?: (action: RightBarAction) => void;
};

const CommentBoxHeader = ({
  commentsCount = 0,
  onCloseComment,
  fromVideoPage,
}: Props) => {
  const handleCloseComment = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseComment &&
      onCloseComment({ comment: false, isOpen: false, user: false });
  };
  return (
    <header className="sticky top-0 left-0 py-3 flex justify-between items-center w-full h-auto">
      <div>
        <span className="leading-6 text-base text-white opacity-90 font-medium">
          全部评论
          <span>({commentsCount})</span>
        </span>
      </div>
      {fromVideoPage || (
        <Button
          text=""
          onClick={handleCloseComment}
          className="text-white opacity-50 hover:opacity-100"
          icon={
            <svg
              width="36"
              height="36"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
              viewBox="0 0 36 36"
            >
              <path d="M22.133 23.776a1.342 1.342 0 101.898-1.898l-4.112-4.113 4.112-4.112a1.342 1.342 0 00-1.898-1.898l-4.112 4.112-4.113-4.112a1.342 1.342 0 10-1.898 1.898l4.113 4.112-4.113 4.113a1.342 1.342 0 001.898 1.898l4.113-4.113 4.112 4.113z"></path>
            </svg>
          }
        />
      )}
    </header>
  );
};

export default CommentBoxHeader;
