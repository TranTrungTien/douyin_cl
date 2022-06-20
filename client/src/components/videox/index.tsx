import { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
  styleArray?: string;
};

const Video = ({ children, width = "w-full", height = "h-full" }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      onClick={(e) => {
        console.log("click", e);
      }}
      className={`${width} ${height} flex-1 relative grid place-content-center overflow-hidden rounded-md`}
    >
      <div
        className="z-0 absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gradient-to-r from-darkslategray2 to-darkslategray3 blur-xl rounded-md"
        style={{
          backgroundImage:
            "url(https://i2-prod.cheshire-live.co.uk/incoming/article19274328.ece/ALTERNATES/s1227b/0_Ryan-Mottrams-picture-of-Middlewich.jpg)",
        }}
      ></div>
      {/* Video */}
      <video
        ref={videoRef}
        className="max-h-full w-auto h-auto object-contain object-center rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
        src="/download.mp4"
        muted={false}
      ></video>
      {/* Pause when clicking */}
      {/* <button
        type="button"
        title="click"
        className="absolute top-1/2 left-1/2 text-white opacity-70 transform -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="100"
          height="100"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 39 39"
        >
          <path d="M10 10.693c0-1.7 0-2.549.354-3.013A1.729 1.729 0 0111.64 7c.582-.03 1.284.45 2.687 1.409l9.697 6.63c1.097.75 1.646 1.126 1.843 1.598.172.414.177.878.014 1.296-.187.476-.727.863-1.808 1.638l-9.697 6.945c-1.413 1.013-2.12 1.52-2.71 1.498a1.728 1.728 0 01-1.305-.67C10 26.877 10 26.007 10 24.268V10.693z"></path>
        </svg>
      </button> */}
      {Array.isArray(children) ? children.map((child) => child) : children}
    </div>
  );
};

export default Video;
