import axios from "axios";
import { SyntheticEvent } from "react";
import Comment from "../../components/comment";
import CommentHeader from "../../components/commentbboxheader";
import Input from "../../components/input";
import { servicesPath } from "../../config/app_config";
import { postData } from "../../services/app_services";
import { RightBarAction } from "../videoslide";

type Props = {
  video_id: string;
  handleCloseComment: (action: RightBarAction) => void;
};

const CommentContainer = ({ handleCloseComment, video_id }: Props) => {
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      comment: {
        value: string;
      };
      reset: () => void;
    };
    const text = target.comment.value;
    target.reset();
    postData(
      servicesPath.POST_COMMENT,
      {
        video_id: video_id,
        text: text,
      },
      true
    );
  };
  return (
    <>
      <div className="shadow-md w-full px-3 pb-2">
        <CommentHeader handleCloseComment={handleCloseComment} />
        <Input onSubmit={onSubmit} />
      </div>
      <div className="w-full h-auto overflow-auto hidden-scrollbar">
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
        <Comment styleArray="px-3" />
      </div>
    </>
  );
};

export default CommentContainer;
