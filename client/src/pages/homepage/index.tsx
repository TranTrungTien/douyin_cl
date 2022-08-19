import Nav from "../../components/nav";
import Search from "../../components/search";
import {
  HeaderContainer,
  SidebarContainer,
  VideoSlideContainer,
} from "../../layouts";

type Props = {};
const HomePage = (props: Props) => {
  return (
    <div className={`flex justify-start items-start h-screen overflow-hidden`}>
      <SidebarContainer />
      <div className="flex flex-col justify-start items-start bg-light_blue h-full w-full overflow-hidden">
        <HeaderContainer
          fromHomePage={true}
          className="laptop:py-[6px] desktop:py-[9px]"
        >
          <Search />
          <Nav />
        </HeaderContainer>
        <div className="w-full h-[calc(100vh-63px)] flex justify-center items-center">
          <VideoSlideContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
