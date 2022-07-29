import React from "react";
type Props = {
  cover_url?: string;
};
const BackgroundVideo = ({ cover_url }: Props) => {
  return (
    <div
      className="absolute -z-10 top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gradient-to-r from-darkslategray2 to-darkslategray3 blur-xl rounded-md"
      style={{
        backgroundImage: `url(${
          cover_url ? cover_url : "images/video_background.jpg"
        })`,
      }}
    ></div>
  );
};

export default BackgroundVideo;
