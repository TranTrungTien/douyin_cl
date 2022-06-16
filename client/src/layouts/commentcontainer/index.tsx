import Comment from "../../components/comment";
import CommentHeader from "../../components/commentbboxheader";
import { RightBarAction } from "../videoslide";

type Props = {
  handleCloseComment: (action: RightBarAction) => void;
};

const CommentContainer = ({ handleCloseComment }: Props) => {
  return (
    <>
      <CommentHeader handleCloseComment={handleCloseComment} />
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
