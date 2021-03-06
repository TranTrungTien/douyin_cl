import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { sidebarAction } from "../../constants/sidebar_action";

type Props = {};
const Sidebar = (props: Props) => {
  return (
    <aside className="bg-dark_blue laptop:max-w-min desktop:max-w-min extra-desktop:max-w-172px over-desktop:max-w-[200px] h-full sticky top-0 left-0">
      <div className="flex flex-col laptop:items-center h-full overflow-auto hidden-scrollbar">
        <div className="w-28 h-20 flex laptop:justify-center desktop:ml-0 desktop:justify-center items-center py-3 cursor-pointer">
          <Link to="/">
            <img
              className="block w-full h-full object-cover object-center"
              src="/images/douyin_logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <div>
          <ul>
            {sidebarAction.map((action, index) => {
              return (
                <NavLink to={action.path} key={index}>
                  <li className="flex desktop:justify-start laptop:items-center desktop:items-center leading-9 cursor-pointer opacity-60 hover:opacity-100 desktop:m-3 laptop:m-0 laptop:flex-col desktop:flex-row laptop:space-x-0 desktop:space-x-1  laptop:ml-0 desktop:ml-5 desktop:mx-12 mb-0">
                    <div className="w-36px h-36px">
                      <img
                        className="block w-full h-full object-cover object-center"
                        src={action.actionImage}
                        alt={action.actionName}
                      />
                    </div>
                    <div className="max-h-min">
                      <span className="text-white laptop:text-[15px] desktop:text-base font-normal">
                        {action.actionName}
                      </span>
                    </div>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className="laptop:hidden desktop:block py-16 pr-4 pl-3">
          <div className="text-white opacity-50 text-xs">
            <div className="o1h2uP_i">
              <div className="h9hROuDG">
                <span>2022 ?? ??????</span>
              </div>
              <div className="h9hROuDG">
                <a
                  href="https://beian.miit.gov.cn/"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ???ICP???16016397???-3
                </a>
              </div>
              <div className="w-3 h-3">
                <a
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002002046"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-full h-full object-cover object-center"
                    alt=""
                    src="//p3-pc.douyinpic.com/tos-cn-i-tsj2vxp0zn/emblem.png~tplv-tsj2vxp0zn-image.image"
                  />
                </a>
                <span>??????????????? 11000002002046???</span>
              </div>
              <div className="h9hROuDG">
                <a
                  href="https://lf3-static.bytednsdoc.com/obj/eden-cn/5201eh7bvoguloz/douyin_web/zhizuojingying.pdf"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ???????????????????????????????????????
                </a>
              </div>
              <div className="h9hROuDG">
                <a
                  href="https://lf3-static.bytednsdoc.com/obj/eden-cn/5201eh7bvoguloz/douyin_web/zengzhixuke.pdf"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ???B2-20170846
                </a>
              </div>
              <div className="h9hROuDG">
                <a
                  href="https://lf3-static.bytednsdoc.com/obj/eden-cn/5201eh7bvoguloz/douyin_web/wangluowenhuajingying.jpg"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ?????????????????????-?????????-???2016???2282-264???
                </a>
              </div>
            </div>
            <div className="o1h2uP_i">
              <div className="h9hROuDG">
                <a
                  href="https://www.piyao.org.cn/yybgt/index.htm"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ?????????????????????
                </a>
              </div>
              <div className="h9hROuDG">
                <a
                  href="https://www.12377.cn/"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????????????????
                </a>
              </div>
              <div className="h9hROuDG">
                <span>??????????????????????????? 400-140-2108</span>
              </div>
              <div className="h9hROuDG">
                <span>????????????????????? 400-9922-556</span>
              </div>
              <div className="h9hROuDG">
                <span>
                  ???????????????????????????????????????????????? feedback@douyin.com
                </span>
              </div>
            </div>
            <div className="yA0rrc2M">
              <div className="YfdKaFoj">
                <a
                  href="https://www.oceanengine.com/resource/douyin"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="https://www.douyin.com/agreements/?id=6773906068725565448"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ??????????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="https://www.douyin.com/agreements/?id=6773901168964798477"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="https://www.douyin.com/recovery_account/"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="https://www.douyin.com/aboutus/#contact"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="https://www.douyin.com/aboutus/#join"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="https://www.douyin.com/business_license/"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="https://www.douyin.com/friend_links"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
              <div className="YfdKaFoj">
                <a
                  href="/htmlmap/hotauthor_A_1"
                  className="B3AsdZT9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ????????????
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
