import React from "react";
import "./style.css";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full flex justify-center items-center">
      <div className="loading-container__circle"></div>
    </div>
  );
};

export default Loading;
