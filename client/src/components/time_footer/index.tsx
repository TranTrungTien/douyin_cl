type Props = {
  bottom?: string;
  right?: string;
  time: string;
  className?: string;
};

const TimeFooter = ({
  time,
  right = "right-0",
  bottom = "bottom-0",
  className,
}: Props) => {
  return (
    <div className={`absolute ${bottom} ${right} ${className}`}>
      <span className="font-medium text-sm text-white leading-[22px]">
        {time}
      </span>
    </div>
  );
};

export default TimeFooter;
