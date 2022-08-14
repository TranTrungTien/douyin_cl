import { useEffect, useState } from "react";
import { getData } from "../services/app_services";

export function useFetch<T>(
  url: string,
  params: any,
  withCredentials: boolean = false,
  responseType: "text" | "json" | "blob" | "arraybuffer" = "json",
  headerContentType = "application/json"
) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      return await getData<T>(
        url,
        params,
        withCredentials,
        responseType,
        headerContentType
      ).catch(console.error);
    };
    if (url) {
      fetchData().then(
        (response) => response && response.data && setData(response.data)
      );
    }
  }, [url, withCredentials, headerContentType, params, responseType]);
  return data;
}
