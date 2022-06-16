type Props = {
  bottom?: string;
  right?: string;
  time: string;
};

const TimeFooter = ({
  time,
  right = "right-0",
  bottom = "bottom-0",
}: Props) => {
  return (
    <div className={`absolute ${bottom} ${right}`}>
      <span className="font-medium text-sm text-white leading-[22px]">
        {time}
      </span>
    </div>
  );
};

export default TimeFooter;
