import React from "react";
import { Logo, Nav, Search } from "../components";
import { HeaderContainer } from "../layouts";

const ErrorPage = () => {
  return (
    <div className="w-full h-auto">
      <HeaderContainer>
        <Logo />
        <Search />
        <Nav />
      </HeaderContainer>
      <section className="min-h-screen text-center">
        <h1>Error Page</h1>
      </section>
    </div>
  );
};

export default ErrorPage;
