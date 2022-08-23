import { useEffect, useState } from "react";
import { getData, ResponseType } from "../services/app_services";

export function useFetchAppend<T1, T2>(
  url: string,
  params: any,
  errorHandler?: (args?: any) => void,
  callbackHandler?: (args?: any) => void,
  queryCondition: boolean = false,
  withCredentials: boolean = false,
  responseType: ResponseType = "json",
  contentType: string = "application/json"
) {
  const [data, setData] = useState<{
    message: string;
    list: T1[];
    statistics?: T2[];
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData<{
        message: string;
        list: T1[];
        statistics?: T2[];
      }>(url, params, withCredentials, responseType, contentType).catch(
        (err) => {
          errorHandler && errorHandler();
        }
      );
      if (response && response.data) {
        const d = response.data;
        setData((prev) => {
          if (!prev) {
            return d;
          } else {
            return {
              ...prev,
              list: [...prev.list, ...d.list],
            };
          }
        });
      }
    };
    if (queryCondition) {
      callbackHandler && callbackHandler();
      fetchData();
    }
  }, [
    url,
    queryCondition,
    params,
    errorHandler,
    callbackHandler,
    withCredentials,
    responseType,
    contentType,
  ]);
  return { data, setData };
}
