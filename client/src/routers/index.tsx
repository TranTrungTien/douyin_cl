import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, Lives, UploadVideo, UserPage, VideoPage } from "../pages";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lives" element={<Lives />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/video/:video_id/:video_idf" element={<VideoPage />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
};

export default Routers;
