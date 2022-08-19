import { Suspense } from "react";
import { Button, Loading } from "../../components";
import Modal from "../../components/modal";
import SwiperWrapper from "../swiper_container";
import ErrorBoundary from "../../utils/error-boundaries";
type Props = {};
const VideoSlideContainer = (props: Props) => {
  console.log("video slide container re render");

  return (
    <main className="w-full h-[95%] laptop:px-[20px] desktop:px-[30px] overflow-hidden relative">
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
    </main>
  );
};

export default VideoSlideContainer;
