import { lazy, Suspense } from "react";
import { Loading } from "../components";
const SearchPage = lazy(() => import("../pages/search_page"));
const HomePage = lazy(() => import("../pages/homepage"));
const Lives = lazy(() => import("../pages/lives"));
const UploadVideo = lazy(() => import("../pages/upload_videopage"));
const UserPage = lazy(() => import("../pages/userpage"));
const VideoPage = lazy(() => import("../pages/videopage"));

const SuspenseComponent = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props}></Component>
    </Suspense>
  );
};

export const routesPath = [
  {
    path: "/",
    element: SuspenseComponent(HomePage),
  },
  {
    path: "/live",
    element: SuspenseComponent(Lives),
  },
  {
    path: "/user/:user_id",
    element: SuspenseComponent(UserPage),
  },
  {
    path: "/video/:video_id/:video_idf",
    element: SuspenseComponent(VideoPage),
  },
  {
    path: "/upload",
    element: SuspenseComponent(UploadVideo),
  },
  {
    path: "/search",
    element: SuspenseComponent(SearchPage),
  },
];
