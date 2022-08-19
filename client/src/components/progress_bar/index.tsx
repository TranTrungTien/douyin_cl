import { forwardRef, MouseEvent } from "react";
type Props = {
  onChangeVideoTime?: (position: number) => void;
};
const ProgressBar = forwardRef(
  ({ onChangeVideoTime }: Props, progressContainerRef) => {
    const progressWrapper = progressContainerRef as any;
    const { progressBarRef, progressRef } = progressWrapper?.current;
    const handleChangeVideoTime = (
      e: MouseEvent<HTMLDivElement> & { target: HTMLElement }
    ) => {
      onChangeVideoTime &&
        onChangeVideoTime(e.clientX - e.target.getBoundingClientRect().x);
    };
    return (
      <div className="w-full h-2 flex justify-start items-center cursor-pointer group">
        <div
          onClick={handleChangeVideoTime}
          ref={progressBarRef}
          className="w-full bg-darkslategray2 h-[3px] group-hover:h-[5px] relative"
        >
          <div
            ref={progressRef}
            data-volume="unavailable"
            className="transition-all w-0 h-full bg-white relative"
          >
            <div className="absolute -right-[5px] -top-1 w-3 h-3 rounded-full bg-white hidden group-hover:block"></div>
          </div>
        </div>
      </div>
    );
  }
);

export default ProgressBar;
