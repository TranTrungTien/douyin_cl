import React from "react";
import { Logo, Nav, Search } from "../../components";
import { HeaderContainer, UploadContainer } from "../../layouts";

const UploadVideo = () => {
  return (
    <div className="h-full overflow-y-auto">
      <HeaderContainer className="py-[9px]">
        <Logo />
        <Search />
        <Nav />
      </HeaderContainer>
      <UploadContainer />
    </div>
  );
};

export default UploadVideo;
