import { LeftHeaderWrapper, Logo, Nav, Search } from "../../components";
import {
  Header,
  PageContainer,
  SideContainer,
  UserInfo,
  UserVideoContainer,
} from "../../layouts";

type Props = {};

const UserPage = (props: Props) => {
  return (
    <section className="w-full flex flex-col justify-start items-start h-screen">
      <div
        style={{ overflow: "overlay" }}
        className="w-full h-full custom-scrollbar bg-light_blue"
      >
        <Header styleArray="py-[10px]">
          <LeftHeaderWrapper>
            <Logo py="0" />
            <Search />
          </LeftHeaderWrapper>
          <Nav />
        </Header>
        <PageContainer>
          <SideContainer styleArray="min-h-full flex-1 text-white pt-10">
            <UserInfo />
          </SideContainer>
          <SideContainer
            width="2xl:w-[1024px]"
            height="h-full"
            styleArray="text-white"
          >
            <UserVideoContainer />
          </SideContainer>
        </PageContainer>
      </div>
    </section>
  );
};

export default UserPage;
