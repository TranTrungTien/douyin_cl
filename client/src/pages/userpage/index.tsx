import { UIEvent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Logo, Nav, Search } from "../../components";
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

  const userRes = useFetch<null | { message: string; doc: IUser }>(
    servicesPath.GET_USER_INFO,
    userInfoParams,
    false,
    me.data?.uid !== user_id ? true : false
  );

  const user = userRes ? userRes.doc : me.data;

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
        <PageContainer className="laptop:w-full laptop:px-5 desktop:max-w-max extra-desktop:max-w-[1280px] over-desktop:max-w-[1440px] mx-auto desktop:space-x-3 extra-desktop:space-x-0">
          <SideContainer className="desktop:min-w-min  min-h-full flex-1 text-white pt-10">
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
          <SideContainer className="over-desktop:w-[900px] text-white shadow-[-18px_0px_80px_#000] h-max">
            {user && (
              <UserVideoContainer
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
