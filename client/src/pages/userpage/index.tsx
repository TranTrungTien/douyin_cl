import { UIEvent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Logo, Nav, Search } from "../../components";
import { servicesPath } from "../../config/app_config";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
import { IUser } from "../../interfaces/user.interface";
import {
  HeaderContainer,
  LeftHeaderContainer,
  PageContainer,
  SideContainer,
  UserInfoContainer,
  UserVideoContainer,
} from "../../layouts";

type Props = {};

export interface ICursorState {
  viewOwn: {
    isCurrent: boolean;
    cursorPosition: number;
    reachToEnd: boolean;
  };
  viewLiked: {
    isCurrent: boolean;
    cursorPosition: number;
    reachToEnd: boolean;
  };
}

const UserPage = (props: Props) => {
  const { user_id } = useParams();
  const jsonHeader = useMemo(() => {
    return axiosConfigHeaders(
      "GET",
      "json",
      "application/json",
      "application/json",
      {
        uid: user_id,
      }
    );
  }, [user_id]);
  const user = useFetch<null | { message: string; doc: IUser }>(
    servicesPath.GET_USER_INFO,
    jsonHeader
  );
  const [cursorState, setCursorState] = useState<ICursorState>({
    viewOwn: {
      isCurrent: true,
      cursorPosition: 0,
      reachToEnd: false,
    },
    viewLiked: {
      isCurrent: false,
      cursorPosition: 0,
      reachToEnd: false,
    },
  });
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const isScrollToBottom =
      e.currentTarget.scrollHeight -
      window.innerHeight -
      e.currentTarget.scrollTop;

    if (isScrollToBottom === 0) {
      if (cursorState.viewOwn.isCurrent) {
        if (!cursorState.viewOwn.reachToEnd) {
          setCursorState((preState) => {
            return {
              ...preState,
              viewOwn: {
                cursorPosition: preState.viewOwn.cursorPosition + 1,
                isCurrent: true,
                reachToEnd: false,
              },
            };
          });
        }
      } else if (!cursorState.viewLiked.isCurrent) {
        if (!cursorState.viewLiked.reachToEnd) {
          setCursorState((preState) => {
            return {
              ...preState,
              viewLiked: {
                cursorPosition: preState.viewOwn.cursorPosition + 1,
                isCurrent: true,
                reachToEnd: false,
              },
            };
          });
        }
      }
    }
  };
  const stopFetchingMoreVideo = () => {
    if (cursorState.viewOwn.isCurrent) {
      if (!cursorState.viewOwn.reachToEnd)
        setCursorState((preState) => {
          return {
            ...preState,
            viewOwn: {
              ...preState.viewOwn,
              reachToEnd: true,
            },
          };
        });
    } else if (cursorState.viewLiked.isCurrent) {
      if (!cursorState.viewLiked.reachToEnd)
        setCursorState((preState) => {
          return {
            ...preState,
            viewLiked: {
              ...preState.viewLiked,
              reachToEnd: true,
            },
          };
        });
    }
  };
  return (
    <section className="w-full flex flex-col justify-start items-start h-screen">
      <div
        style={{ overflow: "overlay" }}
        onScroll={onScroll}
        className="w-full h-full custom-scrollbar bg-light_blue"
      >
        <HeaderContainer styleArray="py-[10px]">
          <LeftHeaderContainer>
            <Logo py="0" />
            <Search />
          </LeftHeaderContainer>
          <Nav />
        </HeaderContainer>
        <PageContainer styleArray="laptop:w-full laptop:px-5 desktop:max-w-max extra-desktop:max-w-[1280px] over-desktop:max-w-[1440px] mx-auto desktop:space-x-3 extra-desktop:space-x-0">
          <SideContainer styleArray="desktop:min-w-min  min-h-full flex-1 text-white pt-10">
            {user?.doc && (
              <UserInfoContainer
                avatar_thumb_url={user.doc.avatar_thumb.url_list[0]}
                nickname={user.doc.nickname}
                user_id={user.doc._id}
              />
            )}
          </SideContainer>
          <SideContainer styleArray="over-desktop:w-[900px] text-white shadow-[-18px_0px_80px_#000] h-max">
            {user?.doc && (
              <UserVideoContainer
                viewLikedAllowed={user.doc.show_favorite_list}
                stopFetchingMoreVideo={stopFetchingMoreVideo}
                cursor={cursorState}
                author_id={user.doc._id}
              />
            )}
          </SideContainer>
        </PageContainer>
      </div>
    </section>
  );
};

export default UserPage;
