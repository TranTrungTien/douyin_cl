type Props = {
  pinned?: boolean;
  hot?: boolean;
  top?: string;
  left?: string;
  text: string;
};
const VideoBadge = ({
  hot,
  text,
  pinned,
  top = "top-2",
  left = "left-2",
}: Props) => {
  return (
    <div
      className={`absolute ${top} ${left} inline-block ${
        pinned && "bg-badge_yellow"
      } ${
        hot && "bg-gradient-to-r from-badge_orange to-badge_red"
      } px-1 rounded-sm`}
    >
      <span className="text-xs font-medium text-black leading-5">{text}</span>
    </div>
  );
};

export default VideoBadge;
