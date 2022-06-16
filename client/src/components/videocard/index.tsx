import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  styleArray?: string;
};
const VideoCard = ({
  children,
  width = "w-132px",
  height = "w-176px",
  styleArray,
}: Props) => {
  return (
    <div
      className={`${width} ${height} ${styleArray} relative place-self-center`}
    >
      <img
        src="https://64.media.tumblr.com/72973457b8e180f1e2a6aff1d90ab638/c7f57df796d723d6-93/s1280x1920/447817b9a0e6a23eaeb830e5ee37cf2379d16efa.jpg"
        alt="Video Cover"
        className="w-full h-full object-cover object-center rounded"
      />
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default VideoCard;
