import { Suspense, useEffect, useRef } from "react";
import { Button, Loading } from "../../components";
import Modal from "../../components/modal";
import { getBoundingClientRect } from "../../utils";
import ErrorBoundary from "../../utils/error-boundaries";
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
      <div className="w-full h-[95%] laptop:px-[20px] desktop:px-[30px] overflow-hidden relative">
        <Suspense fallback={<Loading />}>
          <ErrorBoundary
            fallback={
              <Modal>
                <div className="w-96 h-96 rounded bg-white text-center text-black">
                  <h1>Opps we ran into some problems</h1>
                  <Button
                    text="Refresh page"
                    onClick={() => window.location.reload()}
                  />
                  <Button
                    text="Comme back home page"
                    onClick={() => window.location.replace("/")}
                  />
                </div>
              </Modal>
            }
          >
            <SwiperWrapper />
          </ErrorBoundary>
        </Suspense>
      </div>
    </main>
  );
};

export default VideoSlideContainer;
