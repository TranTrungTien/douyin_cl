import React from "react";

const RelatedSearch = () => {
  return (
    <div className="w-full h-auto mb-16">
      <p className="text-lg font-medium text-white opacity-90">相关搜索</p>
      <div className="grid place-content-center grid-cols-4 gap-3 mt-3">
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            曹哥记录短视频
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            曹哥的一家三口
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            4位被永久封号的网红
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            曹哥说电影
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            永久封号的十大主播
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            最近被封的8个网红
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            曹哥降糖
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            近期被封号的网红
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            2022网红被封禁名单
          </p>
        </div>
        <div className="bg-darkslategray rounded px-3 py-1 cursor-pointer">
          <p className="text-sm font-normal text-white text-center opacity-80 hover:opacity-100 truncate">
            网红被封禁名单
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedSearch;
