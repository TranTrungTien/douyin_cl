import { ReactNode } from "react";
import { servicesPath } from "../../services/services_path";

type Props = {
  children: ReactNode[] | ReactNode;
  title?: string;
  className?: string;
  coverImage?: string;
};
const VideoCard = ({ coverImage, children, className, title }: Props) => {
  return (
    <div className={`${className} relative place-self-center`}>
      <img
        src={coverImage && `${servicesPath.BASE_URL}/${coverImage}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://64.media.tumblr.com/72973457b8e180f1e2a6aff1d90ab638/c7f57df796d723d6-93/s1280x1920/447817b9a0e6a23eaeb830e5ee37cf2379d16efa.jpg";
        }}
        alt={title}
        className="w-full h-full object-cover object-center rounded"
      />
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default VideoCard;
