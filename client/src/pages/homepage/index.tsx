import { Suspense } from "react";
import Nav from "../../components/nav";
import Search from "../../components/search";
import { Header, Sidebar, VideoSlideContainer } from "../../layouts";
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
          <Suspense fallback={<div>Loading ...</div>}>
            <VideoSlideContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
