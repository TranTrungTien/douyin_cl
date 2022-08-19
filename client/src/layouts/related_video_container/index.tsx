import { useMemo } from "react";
import { RelatedVideo } from "../../components";
import { servicesPath } from "../../services/services_path";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { IVideo } from "../../interfaces/video.interface";

type Props = {
  videoIdf: string;
};
const RelatedVideoContainer = ({ videoIdf }: Props) => {
  const relatedVideoParams = useMemo(() => {
    return {
      videoId: `${videoIdf}`,
      limit: 15,
    };
  }, [videoIdf]);
  const relatedVideo = useFetchSuspense<{
    message: string;
    doc: IVideo[];
  }>(servicesPath.GET_RELATED_RECOMMENDED, relatedVideoParams);

  return (
    <div className="flex flex-col justify-start items-start space-y-6 w-full h-full mt-6">
      {relatedVideo &&
        relatedVideo.doc &&
        relatedVideo.doc.map((video, index) => (
          <RelatedVideo
            key={index}
            coverImage={video.origin_cover.url_list[0]}
            desc={video.desc}
            nickname={video.author_id.nickname}
          />
        ))}
    </div>
  );
};

export default RelatedVideoContainer;
