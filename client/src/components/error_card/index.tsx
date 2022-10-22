import React from "react";
import Button from "../button";
import background from "../../assets/images/cry_chibi.png";
const ErrorCard = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="error_card w-96 h-96 bg-[rgba(37,35,35,0.4)] rounded-md text-center text-white flex justify-end items-center flex-col p-3"
    >
      <h1>糟糕，我们遇到了一些问题</h1>
      <div className="space-x-10 mt-10">
        <Button
          text=""
          className="bg-fresh_red px-6 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          <span className="text-white">刷新</span>
        </Button>
        <Button
          text=""
          className="bg-fresh_red px-6 py-2 rounded"
          onClick={() => window.location.replace("/")}
        >
          <span className="text-white">去主页</span>
        </Button>
      </div>
    </div>
  );
};

export default ErrorCard;
