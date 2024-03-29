import React from "react";
import { servicesPath } from "../../services/services_path";
type Props = {
  coverImage?: string;
};
const BackgroundVideo = ({ coverImage }: Props) => {
  return (
    <div
      data-type="clickable"
      className="absolute z-[21] top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gradient-to-r from-darkslategray2 to-darkslategray3 blur-xl rounded-md cursor-pointer"
      style={{
        backgroundImage: `url(${
          coverImage
            ? `${servicesPath.BASE_URL}/${coverImage}`
            : "images/video_background.jpg"
        })`,
      }}
    ></div>
  );
};

export default BackgroundVideo;
