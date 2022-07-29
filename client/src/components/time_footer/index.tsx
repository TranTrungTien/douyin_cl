type Props = {
  bottom?: string;
  right?: string;
  time: string;
  styleArray?: string;
};

const TimeFooter = ({
  time,
  right = "right-0",
  bottom = "bottom-0",
  styleArray,
}: Props) => {
  return (
    <div className={`absolute ${bottom} ${right} ${styleArray}`}>
      <span className="font-medium text-sm text-white leading-[22px]">
        {time}
      </span>
    </div>
  );
};

export default TimeFooter;
