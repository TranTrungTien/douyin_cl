import axios from "axios";
import { UIEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LeftHeaderWrapper, Logo, Nav, Search } from "../../components";
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
  const [user, setUser] = useState<null | { message: string; doc: IUser }>(
    null
  );

  const [cursorState, setCursorState] = useState(0);
  useEffect(() => {
    axios
      .get<{ message: string; doc: IUser }>("user/info", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        params: {
          uid: user_id,
        },
      })
      .then((data) => {
        console.log(data.data.doc);
        setUser(data.data);
      })
      .catch(alert);
  }, [user_id]);
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const isScrollToBottom =
      e.currentTarget.scrollHeight -
      window.innerHeight -
      e.currentTarget.scrollTop;
    if (isScrollToBottom === 0) {
      setCursorState((preState) => ++preState);
    }
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
        <PageContainer styleArray="extra-desktop:max-w-[1280px] mx-auto">
          <SideContainer styleArray="min-w-max min-h-full flex-1 text-white pt-10">
            {user && <UserInfo user={user.doc} />}
          </SideContainer>
          <SideContainer styleArray="text-white shadow-[-18px_0px_80px_#000] h-max">
            {user && (
              <UserVideoContainer
                viewLikedAllowed={user.doc.show_favorite_list}
                cursor={cursorState}
                author_id={user?.doc._id}
              />
            )}
          </SideContainer>
        </PageContainer>
      </div>
    </section>
  );
};

export default UserPage;
