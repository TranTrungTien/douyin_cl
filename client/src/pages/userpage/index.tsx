import { UIEvent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { LeftHeaderWrapper, Logo, Nav, Search } from "../../components";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
import { IUser } from "../../interfaces/user.interface";
import {
  Header,
  PageContainer,
  SideContainer,
  UserInfo,
  UserVideoContainer,
} from "../../layouts";

type Props = {};

const UserPage = (props: Props) => {
  const { user_id } = useParams();
  const jsonHeader = useMemo(() => {
    return axiosConfigHeaders("json", "application/json", "application/json", {
      uid: user_id,
    });
  }, [user_id]);
  const user = useFetch<null | { message: string; doc: IUser }>(
    "user/info",
    jsonHeader
  );
  const [cursorState, setCursorState] = useState({
    cursorPosition: 0,
    reachToEnd: false,
  });
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const isScrollToBottom =
      e.currentTarget.scrollHeight -
      window.innerHeight -
      e.currentTarget.scrollTop;
    if (isScrollToBottom === 0 && !cursorState.reachToEnd) {
      setCursorState((preState) => {
        return {
          cursorPosition: preState.cursorPosition + 1,
          reachToEnd: false,
        };
      });
    }
  };
  const stopFetchingMoreVideo = () => {
    if (!cursorState.reachToEnd)
      setCursorState((preState) => {
        return {
          cursorPosition: cursorState.cursorPosition,
          reachToEnd: true,
        };
      });
  };
  return (
    <section className="w-full flex flex-col justify-start items-start h-screen">
      <div
        style={{ overflow: "overlay" }}
        onScroll={onScroll}
        className="w-full h-full custom-scrollbar bg-light_blue"
      >
        <Header styleArray="py-[10px]">
          <LeftHeaderWrapper>
            <Logo py="0" />
            <Search />
          </LeftHeaderWrapper>
          <Nav />
        </Header>
        <PageContainer styleArray="laptop:w-full laptop:px-5 desktop:max-w-max extra-desktop:max-w-[1280px] over-desktop:max-w-[1440px] mx-auto desktop:space-x-3 extra-desktop:space-x-0">
          <SideContainer styleArray="desktop:min-w-min  min-h-full flex-1 text-white pt-10">
            {user?.doc && (
              <UserInfo
                avatar_thumb_url={user.doc.avatar_thumb.url_list[0]}
                nickname={user.doc.nickname}
                user_id={user.doc._id}
              />
            )}
          </SideContainer>
          <SideContainer styleArray="text-white shadow-[-18px_0px_80px_#000] h-max">
            {user?.doc && (
              <UserVideoContainer
                viewLikedAllowed={user.doc.show_favorite_list}
                stopFetchingMoreVideo={stopFetchingMoreVideo}
                cursor={cursorState.cursorPosition}
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
