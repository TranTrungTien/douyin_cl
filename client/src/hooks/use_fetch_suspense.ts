import { useEffect, useState } from "react";
import { getData } from "../services/app_services";
import { promiseWrapper } from "../utils/promise-wrapper";

export function useFetchSuspense<T>(
  url: string,
  params: any,
  conditionQuery: boolean = false,
  withCredentials: boolean = false,
  responseType: "text" | "json" | "blob" | "arraybuffer" = "json",
  contentType: string = "application/json"
) {
  const [resource, setResource] = useState<{
    read: () => undefined | T;
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      return await (
        await getData<T>(
          url,
          params,
          withCredentials,
          responseType,
          contentType
        ).catch((err) => {
          throw err;
        })
      ).data;
    };
    if (url && conditionQuery) {
      const _resource = promiseWrapper<T>(fetchData());
      setResource(_resource);
    }
  }, [url, params, withCredentials, conditionQuery, responseType, contentType]);

  return resource?.read();
}
