import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { RelatedVideo } from "../../components";
import { axiosConfigHeaders } from "../../config/axios-config";
import { useFetch } from "../../hooks/useFetch";
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
  const relatedVideo = useFetch<{
    message: string;
    doc: IVideo[];
  }>("recommendation/related", header);
  console.log(relatedVideo);

  return (
    <div className="flex flex-col justify-start items-start space-y-6 w-full h-full mt-6">
      {relatedVideo &&
        relatedVideo.doc &&
        relatedVideo.doc.map((video, index) => (
          <RelatedVideo key={index} video={video} />
        ))}
    </div>
  );
};

export default RelatedVideoContainer;
