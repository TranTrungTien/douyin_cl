import { lazy, Suspense } from "react";
import { Loading } from "../../components";
import Nav from "../../components/nav";
import Search from "../../components/search";
import { Header, Sidebar } from "../../layouts";

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
            <VideoSlideContainerWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
