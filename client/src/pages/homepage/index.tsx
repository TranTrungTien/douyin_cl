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
    <div
      className={`flex justify-start items-start h-screen max-h-screen overflow-hidden`}
    >
      <SidebarContainer />
      <div className="flex flex-col justify-start items-start bg-light_blue h-full w-full overflow-hidden">
        <HeaderContainer
          id="app_header"
          fromHomePage={true}
          className="laptop:py-[6px] desktop:py-[8px]"
        >
          <Search />
          <Nav />
        </HeaderContainer>
        <VideoSlideContainer />
      </div>
    </div>
  );
};

export default HomePage;
