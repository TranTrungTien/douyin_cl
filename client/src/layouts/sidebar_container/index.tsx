import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { sidebarAction } from "../../routers/sidebar_route";

type Props = {};
const SidebarContainer = (props: Props) => {
  return (
    <aside className="bg-dark_blue min-w-[164px] laptop:max-w-min desktop:max-w-min extra-desktop:max-w-172px over-desktop:max-w-[200px] h-full sticky top-0 left-0">
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
                  <li className="flex desktop:justify-start laptop:items-center desktop:items-center leading-9 cursor-pointer opacity-60 hover:opacity-100 desktop:m-3 laptop:m-0 laptop:flex-col desktop:flex-row laptop:space-x-0 desktop:space-x-1  laptop:ml-0 desktop:mx-8 mb-0">
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
        <div className="laptop:hidden desktop:block pt-12 pb-2 pr-4 pl-3">
          <div className="text-white opacity-50 text-xs">
            <div className="o1h2uP_i">
              <div className="h9hROuDG">
                <span>2022 © 抖音</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarContainer;
