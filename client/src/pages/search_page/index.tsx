import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get("k");
  useEffect(() => {
    const fetchData = async () => {
      const data = await postData<{
        message: string;
        list: IVideo[];
        statistics: IStatistics[];
      }>(servicesPath.GET_SEARCH_RECOMMENDED, {
        text: keyWord,
        limit: 25,
      });
      console.log({ data });
    };
    keyWord && fetchData();
  }, [keyWord]);

  return <div>SearchPage</div>;
};

export default SearchPage;
