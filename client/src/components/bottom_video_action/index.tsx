import { forwardRef, MouseEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { timeFormat } from "../../utils/timeFormat";
import "./style.css";

type Props = {
  video_idf: string;
  video_id: string;
  video_desc: string;
  video_duration: number;
  fromVideoPage: boolean;
  nickname: string;
  isPlay?: boolean;
  allowedPlay?: boolean;
  progressBar: JSX.Element;
  turnOnOffVolume?: (action: boolean) => void;
  handleChangeVolume: (volume: number) => void;
  handleToggleFullscreenMode: () => void;
};

const BottomVideoAction = forwardRef<HTMLSpanElement, Props>(
  (
    {
      video_desc,
      video_duration,
      video_id,
      video_idf,
      fromVideoPage,
      allowedPlay,
      isPlay,
      progressBar,
      nickname,
      turnOnOffVolume,
      handleChangeVolume,
      handleToggleFullscreenMode,
    }: Props,
    timeCounterRef
  ) => {
    console.log("bottom action rerender");
    const volumeRef = useRef<HTMLDivElement>(null);
    const volumeBarRef = useRef<HTMLDivElement>(null);
    const [isTurnOffVolume, setIsTurnOffVolume] = useState(false);
    const [autoNext, setAutoNext] = useState(false);
    // set volume of video for the time
    useEffect(() => {
      if (volumeRef.current) {
        volumeRef.current.style.height =
          (volumeBarRef.current &&
            (volumeBarRef.current.clientHeight / 100) *
              (Number(localStorage.getItem("volume")) * 100) +
              "px") ??
          "0px";
      }
    }, []);

    // set turn on or off volume
    const onTurnOnOffVolume = (
      e: MouseEvent<HTMLButtonElement> & { target: HTMLElement }
    ) => {
      if (e.target.dataset.canChangeVolume === "unavailable") return;
      if (!isTurnOffVolume && volumeRef.current) {
        volumeRef.current.style.height = "0px";
      } else if (isTurnOffVolume && volumeRef.current) {
        volumeRef.current.style.height =
          (volumeBarRef.current &&
            (volumeBarRef.current.clientHeight / 100) *
              (Number(localStorage.getItem("volume")) * 100) +
              "px") ??
          "0px";
      }
      turnOnOffVolume && turnOnOffVolume(!isTurnOffVolume);
      setIsTurnOffVolume(!isTurnOffVolume);
    };

    const onChangeVolume = (
      e: MouseEvent<HTMLDivElement> & { currentTarget: HTMLElement }
    ) => {
      e.stopPropagation();
      if (volumeRef.current && volumeBarRef.current) {
        const bounding = e.currentTarget.getBoundingClientRect();
        const position = e.clientY - bounding.y;
        const volume = (position / bounding.height) * 1;
        volumeRef.current.style.height =
          (volumeBarRef.current.clientHeight / 100) * ((1 - volume) * 100) +
            "px" ?? "0px";
        handleChangeVolume(1 - volume);
      }
    };

    const onChangeMode = () => setAutoNext(!autoNext);
    return (
      <div className="progress_bar absolute bottom-0 left-0 w-full z-[2]">
        <div className="flex flex-col justify-end items-start w-full">
          {/* User name and description */}
          {!fromVideoPage && (
            <div className="flex flex-col items-start w-[95%] h-auto text-white ml-4 mb-4">
              <h3 className="font-medium leading-[26px] text-[18px]">
                @{nickname}
              </h3>
              <p className="font-normal leading-[22px] text-sm opacity-60">
                {video_desc}
              </p>
            </div>
          )}
          <div className="flex justify-end items-start flex-col w-full">
            {/* Progressbar */}
            {progressBar}
            {/* play, pause,time, volume, etc */}
            <div className="flex justify-between items-center px-3 text-white w-full opacity-50 hover:opacity-100 group">
              <div className="text-white">
                {/* play, pause and time */}
                <div className="flex justify-center items-center">
                  <button
                    data-type="bottom_play_clickable"
                    aria-label="play and pause"
                    className="mr-2 mt-1"
                  >
                    {!isPlay || !allowedPlay ? (
                      <svg
                        width="32"
                        height="32"
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 39 39"
                      >
                        <path d="M10 10.693c0-1.7 0-2.549.354-3.013A1.729 1.729 0 0111.64 7c.582-.03 1.284.45 2.687 1.409l9.697 6.63c1.097.75 1.646 1.126 1.843 1.598.172.414.177.878.014 1.296-.187.476-.727.863-1.808 1.638l-9.697 6.945c-1.413 1.013-2.12 1.52-2.71 1.498a1.728 1.728 0 01-1.305-.67C10 26.877 10 26.007 10 24.268V10.693z"></path>
                      </svg>
                    ) : (
                      <svg
                        width="32"
                        height="32"
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 39 39"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11 10.282C11 9.574 11.514 9 12.149 9h1.596c.634 0 1.149.574 1.149 1.282v15.436c0 .708-.515 1.282-1.15 1.282H12.15C11.514 27 11 26.426 11 25.718V10.282zm11 0C22 9.574 22.514 9 23.149 9h1.596c.634 0 1.149.574 1.149 1.282v15.436c0 .708-.515 1.282-1.15 1.282H23.15C22.514 27 22 26.426 22 25.718V10.282z"
                        ></path>
                      </svg>
                    )}
                  </button>
                  <div className="text-sm">
                    <span ref={timeCounterRef}>00:00</span>
                    <span className="mx-1">/</span>
                    <span className="group-hover:opacity-75">
                      {timeFormat(video_duration)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-white">
                <div className="flex justify-between items-center space-x-3 border-r border-gray-500 mr-4 pr-2">
                  {/* auto next video button */}
                  <div className="flex justify-center items-center space-x-1 mr-2">
                    <span className="font-normal text-xs leading-[18px]">
                      自动连播
                    </span>
                    <button
                      className={`w-10 h-5 rounded-full ${
                        autoNext ? "bg-white" : "bg-dimgray"
                      } relative`}
                      type="button"
                      onClick={onChangeMode}
                    >
                      <div
                        className={`absolute h-4 w-4 rounded-full top-1/2 transform -translate-y-1/2 left-px transition-all ${
                          autoNext
                            ? "left-[calc(100%-17px)] bg-black"
                            : "left-px bg-white"
                        }`}
                      ></div>
                    </button>
                  </div>
                  {/* Video's speed */}
                  <div>
                    <span className="font-semibold text-sm">1.0x</span>
                  </div>
                  {/* Volume*/}
                  <button
                    onClick={onTurnOnOffVolume}
                    type="button"
                    className="mt-[2px] relative volume-custom"
                  >
                    <div
                      data-can-change-volume="unavailable"
                      className="volume-inner-custom  cursor-default absolute bottom-full left-0 w-10 h-40 bg-[#323442] py-[10px] px-4 rounded-[4px] flex justify-center items-center"
                    >
                      <div
                        onClick={onChangeVolume}
                        ref={volumeBarRef}
                        className="w-1 h-full rounded-full bg-[hsla(0,0%,100%,.3)] cursor-pointer flex justify-center items-end"
                      >
                        <div
                          ref={volumeRef}
                          className="w-1 relative h-0 rounded-full bg-[#fa1f41] "
                        >
                          <div className="absolute -top-2 -translate-x-1/2 left-px w-3 h-3 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {isTurnOffVolume ? (
                        <svg
                          width="32"
                          height="32"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-current"
                          viewBox="-3 0 39 39"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.418 10.176a1.5 1.5 0 10-2.12 2.121l14.141 14.142a1.5 1.5 0 002.122-2.121L10.418 10.176zm-2.585 3.99h.371l9.63 9.63v2.037a.833.833 0 01-1.355.65L10.874 22.5h-3.04A.833.833 0 017 21.666V15c0-.46.373-.834.833-.834zm11.304 2.449l3.048 3.047a4.157 4.157 0 00-.96-4.288 1.25 1.25 0 00-2.088 1.24zm4.56 4.559l1.8 1.8A7.882 7.882 0 0027 18.334a7.91 7.91 0 00-3.463-6.547 1.25 1.25 0 00-1.408 2.066 5.41 5.41 0 012.37 4.48 5.39 5.39 0 01-.802 2.84zm-9.424-9.423l3.56 3.56v-4.478a.833.833 0 00-1.354-.65l-2.206 1.568z"
                            fillOpacity="0.9"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="32"
                          height="32"
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 39 39"
                        >
                          <path d="M20.336 9.942c.288.138.472.43.472.75v15a.833.833 0 01-1.354.651l-5.605-3.984h-3.041a.833.833 0 01-.833-.833v-6.667c0-.46.373-.833.833-.833h3.04l5.606-3.984c.25-.2.593-.24.882-.1zM22.433 15.217a1.25 1.25 0 011.768.018 4.157 4.157 0 011.19 2.916 4.157 4.157 0 01-1.19 2.916 1.25 1.25 0 11-1.786-1.75c.296-.302.476-.712.476-1.166 0-.455-.18-.865-.476-1.167a1.25 1.25 0 01.018-1.767z"></path>
                          <path d="M26.512 11.647a1.25 1.25 0 00-1.408 2.066 5.41 5.41 0 012.37 4.48 5.41 5.41 0 01-2.37 4.48 1.25 1.25 0 101.408 2.065 7.91 7.91 0 003.462-6.545 7.91 7.91 0 00-3.462-6.546z"></path>
                        </svg>
                      )}
                    </div>
                  </button>
                  {/* Fullscreen */}
                  <button
                    onClick={handleToggleFullscreenMode}
                    className="mt-[2px]"
                  >
                    <svg
                      width="32"
                      height="32"
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 39 39"
                    >
                      <path d="M11.444 16.028a1 1 0 01-1-1v-4.002a1 1 0 011-1h4.001a1 1 0 010 2H13.91l3.072 3.073a1 1 0 11-1.414 1.414l-3.122-3.122v1.636a1 1 0 01-1 1zM20.443 25.026a1 1 0 001 1h4a1 1 0 001.001-1v-4.001a1 1 0 10-2 0v1.536l-3.072-3.072a1 1 0 10-1.415 1.414l3.122 3.123h-1.636a1 1 0 00-1 1zM11.444 20.025a1 1 0 00-1 1v4a1 1 0 001 1.001h4.001a1 1 0 100-2H13.91l3.072-3.072a1 1 0 00-1.414-1.415l-3.122 3.122v-1.636a1 1 0 00-1-1zM20.443 11.026a1 1 0 011-1h4a1 1 0 011.001 1v4.001a1 1 0 01-2 0v-1.536l-3.072 3.073a1 1 0 11-1.415-1.415l3.122-3.122h-1.636a1 1 0 01-1-1z"></path>
                    </svg>
                    {/* <svg
                      width="32"
                      height="32"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 39 39"
                    >
                      <path
                        d="M20.25 25.878a1 1 0 01-1-1v-4.001a1 1 0 011-1h4.001a1 1 0 010 2h-1.536l3.072 3.072a1 1 0 11-1.414 1.415L21.25 23.24v1.637a1 1 0 01-1 1zM10.248 15.877a1 1 0 001 1h4.002a1 1 0 001-1v-4.002a1 1 0 10-2 0v1.536l-3.073-3.072a1 1 0 00-1.414 1.415l3.122 3.122h-1.636a1 1 0 00-1 1zM20.25 10.875a1 1 0 00-1 1v4.002a1 1 0 001 1h4.001a1 1 0 100-2h-1.536l3.072-3.073a1 1 0 10-1.414-1.414l-3.123 3.122v-1.636a1 1 0 00-1-1zM10.248 20.877a1 1 0 011-1h4.002a1 1 0 011 1v4a1 1 0 11-2 0v-1.535l-3.073 3.072A1 1 0 119.763 25l3.122-3.122h-1.636a1 1 0 01-1-1z"
                      ></path>
                    </svg> */}
                  </button>
                </div>

                {!fromVideoPage && (
                  <Link target="_blank" to={`/video/${video_id}/${video_idf}`}>
                    <div className="flex justify-center items-center group-hover: opacity-100">
                      {/* link to video's page */}
                      <span className="text-xs font-normal mr-2">详情</span>
                      <svg
                        width="6"
                        height="9"
                        viewBox="0 0 6 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.7"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.689396 8.12382C0.396503 7.83093 0.396503 7.35605 0.689396 7.06316L3.51782 4.23473L0.689396 1.40631C0.396503 1.11341 0.396503 0.63854 0.689396 0.345646C0.98229 0.0527533 1.45716 0.0527533 1.75006 0.345646L5.10881 3.7044C5.40171 3.9973 5.40171 4.47217 5.10881 4.76506L1.75006 8.12382C1.45716 8.41671 0.98229 8.41671 0.689396 8.12382Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default BottomVideoAction;
