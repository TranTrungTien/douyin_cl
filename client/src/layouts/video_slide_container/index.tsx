import { useEffect, useRef } from "react";
import { getBoundingClientRect } from "../../utils";
import SwiperWrapper from "../swiper_container";
type Props = {};
const VideoSlideContainer = (props: Props) => {
  console.log("video slide container re render");
  const mainRef = useRef<null | HTMLElement>(null);
  useEffect(() => {
    const headerBounding = getBoundingClientRect("app_header");

    const handleResize = () => {
      if (headerBounding) {
        mainRef.current?.style.setProperty(
          "height",
          window.innerHeight - headerBounding.height + "px"
        );
      }
    };
    if (mainRef.current) {
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (mainRef.current) {
      const headerBounding = getBoundingClientRect("app_header");
      if (headerBounding) {
        mainRef.current.style.setProperty(
          "height",
          window.innerHeight - headerBounding.height + "px"
        );
      }
    }
  }, []);
  return (
    <main ref={mainRef} className={`w-full flex justify-center items-center`}>
      <div className="w-full h-[95%] min-h-[95%] laptop:px-[20px] desktop:px-[30px] overflow-hidden relative">
        <SwiperWrapper />
      </div>
    </main>
  );
};

export default VideoSlideContainer;
