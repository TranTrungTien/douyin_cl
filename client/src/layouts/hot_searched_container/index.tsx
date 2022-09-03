import React, { useEffect, useRef } from "react";
import { getBoundingClientRect } from "../../utils";

const HotSearchedContainer = () => {
  const hotSearchedRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (hotSearchedRef.current) {
      const headerBounding = getBoundingClientRect("app_header");
      if (headerBounding) {
        hotSearchedRef.current.style.setProperty(
          "top",
          headerBounding.height + 25 + "px"
        );
      }
    }
  }, []);
  return (
    <div ref={hotSearchedRef} className="text-white sticky max-w-[250px]">
      <h2 className="text-white opacity-90 font-medium text-lg mb-6">
        抖音热榜
      </h2>
      <ul className="">
        <li
          data-text="2022年中国网络文明大会"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          2022年中国网络文明大会
        </li>
        <li
          data-text="唐山打人案主犯审讯视频曝光"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          唐山打人案主犯审讯视频曝光
        </li>
        <li
          data-text="曹芳为直播言论道歉"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          曹芳为直播言论道歉
        </li>
        <li
          data-text="4K视频看运20歼20有多炫"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          4K视频看运20歼20有多炫
        </li>
        <li
          data-text="别惹前女友开播"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          别惹前女友开播
        </li>
        <li
          data-text="唐山被打女子回忆事件经过"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          唐山被打女子回忆事件经过
        </li>
        <li
          data-text="女生自述坐硬卧疑遭骚扰"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          女生自述坐硬卧疑遭骚扰
        </li>
        <li
          data-text="王鹤棣密逃路透"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          王鹤棣密逃路透
        </li>
        <li
          data-text="苍兰诀大结局"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          苍兰诀大结局
        </li>
        <li
          data-text="消失的孩子开播"
          className="text-sm font-normal text-white opacity-80 mb-[10px] py-1 px-3 rounded bg-darkslategray2 whitespace-nowrap w-min truncate"
        >
          消失的孩子开播
        </li>
      </ul>
    </div>
  );
};

export default HotSearchedContainer;
