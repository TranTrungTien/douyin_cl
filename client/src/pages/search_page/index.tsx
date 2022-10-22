import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Loading, Logo, Nav, Search } from "../../components";
import ErrorCard from "../../components/error_card";
import Modal from "../../components/modal";
import {
  HeaderContainer,
  HotSearchedContainer,
  SearchedVideoContainer,
  SearchFilterHeader,
} from "../../layouts";
import ErrorBoundary from "../../utils/error-boundaries";

export interface ISearchPapeData {
  isActive: boolean;
  isVisible: boolean;
  isNext: boolean;
  isPrev: boolean;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get("k");
  return (
    <section
      style={{ overflow: "overlay" }}
      className="w-full h-full overflow-y-auto custom-scrollbar"
    >
      <HeaderContainer id="app_header" className="py-[5px] z-30">
        <div className="flex justify-start items-center">
          <Logo py="py-1" />
          <Search value={keyWord ? keyWord : undefined} className="ml-[74px]" />
        </div>
        <Nav />
      </HeaderContainer>
      {/* extra-desktop:w-[1020px] over-desktop:w-[1280px] */}
      <div className="w-max h-full mx-auto">
        <div className="flex justify-center items-start text-white">
          <div className="mr-16 w-[874px] pb-10">
            {/* header */}
            <SearchFilterHeader />
            <div className="relative min-h-[calc(100vh/2)]">
              {keyWord && (
                <Suspense fallback={<Loading />}>
                  <ErrorBoundary
                    fallback={
                      <Modal>
                        <ErrorCard />
                      </Modal>
                    }
                  >
                    <SearchedVideoContainer keyWord={keyWord} />
                  </ErrorBoundary>
                </Suspense>
              )}
            </div>
          </div>
          {/* key words hot now */}
          <HotSearchedContainer />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
