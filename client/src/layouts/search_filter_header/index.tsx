import React, { useEffect, useRef } from "react";
import { Button } from "../../components";
import { getBoundingClientRect } from "../../utils";

const SearchFilterHeader = () => {
  const searchFilteredRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (searchFilteredRef.current) {
      const headerBounding = getBoundingClientRect("app_header");
      if (headerBounding) {
        searchFilteredRef.current.style.setProperty(
          "top",
          headerBounding.height + "px"
        );
      }
    }
  }, []);
  return (
    <div
      ref={searchFilteredRef}
      className="sticky top-14 z-10 bg-light_blue pt-6 pb-2"
    >
      <div className="flex justify-between items-center">
        <div className="space-x-16">
          <Button
            text=""
            data-key="general"
            className="inline-block font-medium hover:text-fresh_red text-lg cursor-pointer text-white opacity-80 hover:opacity-100"
          >
            综合
          </Button>
          <Button
            text=""
            data-key="video"
            className="inline-block font-medium hover:text-fresh_red text-lg cursor-pointer text-white opacity-80 hover:opacity-100"
          >
            视频
          </Button>
          <Button
            text=""
            data-key="user"
            className="inline-block font-medium hover:text-fresh_red text-lg cursor-pointer text-white opacity-80 hover:opacity-100"
          >
            用户
          </Button>
          <Button
            text=""
            data-key="live"
            className="inline-block font-medium hover:text-fresh_red text-lg cursor-pointer text-white opacity-80 hover:opacity-100"
          >
            直播
          </Button>
        </div>
        <div className="space-x-10 flex justify-center items-center">
          <Button text="" className="flex items-center space-x-2">
            <span className="font-medium hover:text-fresh_red text-lg cursor-pointer text-white opacity-80 hover:opacity-100">
              筛选
            </span>
            <svg
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.898 8.28a.75.75 0 01-1.06 0l-2.83-2.828L3.18 8.28a.75.75 0 01-1.06-1.06l3.358-3.36a.75.75 0 011.061 0l3.359 3.36a.75.75 0 010 1.06z"
                fill="currentColor"
              ></path>
            </svg>
          </Button>
          <Button text="" className="cursor-pointer">
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm1 6a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H4zm6-13a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zm1 6a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2zm-1 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zm8-15a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zm-1 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zm1 6a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2z"
                fill="currentColor"
              ></path>
            </svg>
          </Button>
          <Button text="" className="cursor-pointer">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.445 7.691h15.538a1.385 1.385 0 011.385 1.385v10.538A1.385 1.385 0 0119.983 21H4.445a1.385 1.385 0 01-1.384-1.384V9.075a1.385 1.385 0 011.384-1.385zM5.83 9.768a.692.692 0 00-.693.693v7.769a.692.692 0 00.693.692h12.769a.692.692 0 00.692-.692v-7.77a.692.692 0 00-.692-.692H5.829z"
                fill="currentColor"
              ></path>
              <rect
                x="3"
                y="3"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
              ></rect>
            </svg>
          </Button>
        </div>
      </div>
      <div className="block w-full my-6 overflow-hidden relative">
        <div className="w-full overflow-x-auto hidden-scrollbar whitespace-nowrap">
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded pPPI0mar"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              全部
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              动画
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              环世界游戏
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              守护者
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              夜火
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              秀媚
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              高清壁纸
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              慧姐
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              剧情
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              水彩
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              哥歌
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              湖哥
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              神骑士
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              山羊头
            </span>
          </Button>
          <Button
            text=""
            className="inline-block bg-darkslategray text-sm text-white mr-3 py-1 px-3 opacity-90 hover:text-fresh_red hover:opacity-100 cursor-pointer rounded"
          >
            <span className="text-sm font-medium opacity-80 hover:opacity-100">
              合院
            </span>
          </Button>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2  z[2]">
          <div className="flex justify-center items-center space-x-3 relative before:absolute before:top-0 before:right-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(22,23,34,0.9)] before:to-[rgb(22,23,34)] before:w-24 py-1 before:h-full before:z-[-1]">
            <Button className="inline-block" text="">
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#363741]"
                viewBox="0 0 20 20"
              >
                <circle
                  r="10"
                  transform="matrix(-1 0 0 1 10 10)"
                  fill="currentColor"
                ></circle>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.28 13.898a.75.75 0 000-1.06l-2.828-2.83L12.28 7.18a.75.75 0 00-1.06-1.06L7.86 9.478a.75.75 0 000 1.061l3.36 3.359a.75.75 0 001.06 0z"
                  fill="#fff"
                  fill-opacity="0.9"
                ></path>
              </svg>
            </Button>
            <Button className="inline-block" text="">
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#363741]"
                viewBox="0 0 20 20"
              >
                <circle cx="10" cy="10" r="10" fill="currentColor"></circle>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.72 13.898a.75.75 0 010-1.06l2.828-2.83L7.72 7.18a.75.75 0 011.06-1.06l3.36 3.358a.75.75 0 010 1.061l-3.36 3.359a.75.75 0 01-1.06 0z"
                  fill="#fff"
                  fill-opacity="0.9"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterHeader;
