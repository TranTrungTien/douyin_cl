import React from "react";
import { Button, Logo, Nav, Search } from "../../components";
import { HeaderContainer } from "../../layouts";

const ErrorPage = () => {
  return (
    <div className="w-full h-auto">
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
      <section className="min-h-screen text-center flex justify-center items-center flex-col">
        <div className="mb-16">
          <img src="/images/not_found.png" alt="Not Found" />
        </div>
        <p className="text-white opacity-80 text-sm">页面不见啦</p>
        <Button
          onClick={() => (window.location.pathname = "/")}
          text=""
          className="bg-fresh_red px-10 py-4 rounded mt-4"
        >
          <span className="text-white font-semibold">回首页看看</span>
        </Button>
      </section>
    </div>
  );
};

export default ErrorPage;
