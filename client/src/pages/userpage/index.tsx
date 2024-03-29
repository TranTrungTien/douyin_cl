import { UIEvent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Logo, Nav, Search } from "../../components";
import { useFetch } from "../../hooks/use_fetch";
import { IUser } from "../../interfaces/user.interface";
import {
  HeaderContainer,
  LeftHeaderContainer,
  PageContainer,
  SideContainer,
  UserInfoContainer,
  UserVideoContainer,
} from "../../layouts";
import { useAppSelector } from "../../redux/app/hooks";
import { servicesPath } from "../../services/services_path";

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
  const me = useAppSelector((state) => state.user);
  const userInfoParams = useMemo(() => {
    return {
      uid: user_id,
    };
  }, [user_id]);

  const userRes = useFetch<null | { message: string; data: IUser }>(
    servicesPath.GET_USER_INFO,
    userInfoParams,
    false,
    me.data?.uid !== user_id ? true : false
  );

  const user = me.data?.uid !== user_id ? userRes?.data : me.data;

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
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
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
  const handleStopFetchingMoreVideo = () => {
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
  const handleChangeViewPoint = (viewOwnVideo: boolean) => {
    if (viewOwnVideo && !cursorState.viewOwn.isCurrent) {
      setCursorState((prev) => {
        return {
          ...prev,
          viewOwn: {
            ...prev.viewOwn,
            isCurrent: true,
          },
          viewLiked: {
            ...prev.viewLiked,
            isCurrent: false,
          },
        };
      });
    } else {
      setCursorState((prev) => {
        return {
          ...prev,
          viewLiked: {
            ...prev.viewLiked,
            isCurrent: true,
          },
          viewOwn: {
            ...prev.viewOwn,
            isCurrent: false,
          },
        };
      });
    }
  };

  return (
    <section className="w-full flex flex-col justify-start items-start h-screen">
      <div
        style={{ overflow: "overlay" }}
        onScroll={handleScroll}
        className="w-full h-full custom-scrollbar bg-light_blue"
      >
        <HeaderContainer className="py-[10px]">
          <LeftHeaderContainer>
            <Logo py="0" />
            <Search />
          </LeftHeaderContainer>
          <Nav />
        </HeaderContainer>
        <PageContainer className="laptop:w-full laptop:px-5 desktop:w-max extra-desktop:w-[1280px] over-desktop:w-[1440px] mx-auto desktop:space-x-3 extra-desktop:space-x-0">
          <SideContainer className="desktop:min-w-min  min-h-full flex-1 text-white pt-10 pb-16 ">
            {user && (
              <UserInfoContainer
                followerCount={user.follower_count}
                followingCount={user.following_count}
                totalFavouringCount={user.total_favorited}
                avatarThumb={user.avatar_thumb.url_list[0]}
                nickname={user.nickname}
                authorPageID={user._id}
              />
            )}
          </SideContainer>
          <SideContainer className="over-desktop:w-[900px] text-white shadow-[-18px_0px_80px_#000] h-max pb-16 ">
            {user && (
              <UserVideoContainer
                onChangeViewPoint={handleChangeViewPoint}
                viewLikedAllowed={user.show_favorite_list}
                onStopFetchingMoreVideo={handleStopFetchingMoreVideo}
                cursor={cursorState}
                authorID={user._id}
              />
            )}
          </SideContainer>
        </PageContainer>
      </div>
    </section>
  );
};

export default UserPage;
