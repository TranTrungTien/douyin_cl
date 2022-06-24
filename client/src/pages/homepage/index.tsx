import { lazy, Suspense } from "react";
import { Loading } from "../../components";
import Modal from "../../components/modal";
import Nav from "../../components/nav";
import Search from "../../components/search";
import { Header, Sidebar } from "../../layouts";
import ErrorBoundary from "../../utils/error-boundaries";

const VideoSlideContainerWrapper = lazy(
  () => import("../../layouts/videoslidecontainer")
);
type Props = {};
const HomePage = (props: Props) => {
  return (
    <div className="flex justify-start items-start h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col justify-start items-start bg-light_blue h-full w-full overflow-hidden">
        <Header styleArray="py-[9px]">
          <Search />
          <Nav />
        </Header>
        <div className="w-full h-[calc(100vh-63px)] flex justify-center items-center">
          <Suspense fallback={<Loading />}>
            <ErrorBoundary
              fallback={
                <Modal>
                  <div className="w-96 h-96 rounded bg-white text-center text-black">
                    <h1>Opps we ran into some problems</h1>
                  </div>
                </Modal>
              }
            >
              <VideoSlideContainerWrapper />
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
