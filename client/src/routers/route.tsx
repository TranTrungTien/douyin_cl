import { lazy, Suspense } from "react";
import { Loading } from "../components";
const SearchPage = lazy(() => import("../pages/search_page"));
const HomePage = lazy(() => import("../pages/homepage"));
const Lives = lazy(() => import("../pages/lives"));
const UploadVideo = lazy(() => import("../pages/upload_videopage"));
const UserPage = lazy(() => import("../pages/userpage"));
const VideoPage = lazy(() => import("../pages/videopage"));
const ErrorPage = lazy(() => import("../pages/error_page"));

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
    authRequired: false,
    element: SuspenseComponent(HomePage),
  },
  {
    path: "/live",
    authRequired: false,
    element: SuspenseComponent(Lives),
  },
  {
    path: "/user/:user_id",
    authRequired: false,
    element: SuspenseComponent(UserPage),
  },
  {
    path: "/video/:video_id/:video_idf",
    authRequired: false,
    element: SuspenseComponent(VideoPage),
  },
  {
    path: "/upload",
    authRequired: true,
    element: SuspenseComponent(UploadVideo),
  },
  {
    path: "/search",
    authRequired: false,
    element: SuspenseComponent(SearchPage),
  },
  {
    path: "*",
    authRequired: false,
    element: SuspenseComponent(ErrorPage),
  },
];
