import { useMemo } from "react";
import { RelatedVideo } from "../../components";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { IVideo } from "../../interfaces/video.interface";

type Props = {
  id: string;
};
const RelatedVideoContainer = ({ id }: Props) => {
  const header = useMemo(() => {
    return axiosConfigHeaders(
      "application/json",
      "application/json",
      "application/json",
      {
        videoId: `${id}`,
      }
    );
  }, [id]);
  const relatedVideo = useFetchSuspense<{
    message: string;
    doc: IVideo[];
  }>("recommendation/related", header);
  console.log(relatedVideo);

  return (
    <div className="flex flex-col justify-start items-start space-y-6 w-full h-full mt-6">
      {relatedVideo &&
        relatedVideo.doc &&
        relatedVideo.doc.map((video, index) => (
          <RelatedVideo
            key={index}
            video_cover={video.origin_cover.url_list[0]}
            desc={video.desc}
            nickname={video.author_id.nickname}
          />
        ))}
    </div>
  );
};

export default RelatedVideoContainer;
