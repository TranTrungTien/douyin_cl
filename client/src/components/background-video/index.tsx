import React from "react";

const BackgroundVideo = () => {
  return (
    <div
      className="absolute -z-10 top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gradient-to-r from-darkslategray2 to-darkslategray3 blur-xl rounded-md"
      style={{
        backgroundImage:
          "url(https://i2-prod.cheshire-live.co.uk/incoming/article19274328.ece/ALTERNATES/s1227b/0_Ryan-Mottrams-picture-of-Middlewich.jpg)",
      }}
    ></div>
  );
};

export default BackgroundVideo;
