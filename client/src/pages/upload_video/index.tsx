import React from "react";
import { Logo, Nav, Search } from "../../components";
import { Header, UploadContainer } from "../../layouts";

const UploadVideo = () => {
  return (
    <div className="h-full overflow-y-auto">
      <Header styleArray="py-[9px]">
        <Logo />
        <Search />
        <Nav />
      </Header>
      <UploadContainer />
    </div>
  );
};

export default UploadVideo;
