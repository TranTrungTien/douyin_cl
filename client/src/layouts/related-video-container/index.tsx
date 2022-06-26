import axios from "axios";
import React, { useEffect, useState } from "react";
import { RelatedVideo } from "../../components";

type Props = {
  id: string;
};
const RelatedVideoContainer = ({ id }: Props) => {
  const [relatedVideo, setRelatedVideo] = useState<
    | null
    | {
        author: string;
        link: string;
        local_link: string;
        desc: string;
      }[]
  >(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/recommendation/related", {
        headers: {
          "content-type": "application/json",
        },
        params: {
          videoId: `./videos/${id}`,
        },
      })
      .then((related) => setRelatedVideo(related.data))
      .catch((err) => {
        console.log(err);
        alert("err");
      });
  }, [id]);
  return (
    <div className="flex flex-col justify-start items-start space-y-6 w-full h-full mt-6">
      {relatedVideo &&
        relatedVideo.map((video, index) => (
          <RelatedVideo key={index} video={video} />
        ))}
    </div>
  );
};

export default RelatedVideoContainer;