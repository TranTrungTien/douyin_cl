import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getData, ResponseType } from "../services/app_services";

export function useFetchAppend<T1>(
  url: string,
  params: any,
  errorHandler?: (args?: any) => void,
  callbackHandler?: (args?: any) => void,
  queryCondition: boolean = false,
  withCredentials: boolean = false,
  responseDataHandler?: (responseData: T1[]) => void,
  responseType: ResponseType = "json",
  contentType: string = "application/json",
  reFetchTrigger?: boolean,
  refreshState: boolean = false
) {
  const [data, setData] = useState<{
    status: "loading" | "success" | "error";
    statusCode?: number;
    message?: string;
    list: T1[];
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData<{
        message: string;
        list: T1[];
      }>(url, params, withCredentials, responseType, contentType).catch(
        (err: AxiosError) => {
          setData((prev) => {
            return {
              list: prev?.list || [],
              status: "error",
              statusCode: err.response?.status,
              message: err.response?.statusText,
            };
          });
          errorHandler && errorHandler();
        }
      );
      if (response && response.data) {
        const d = response.data;
        setData((prev) => {
          if (!prev) {
            return {
              status: "success",
              ...d,
            };
          } else {
            return {
              ...prev,
              status: "success",
              message: d.message,
              list: [...(prev.list || []), ...(d.list || [])],
            };
          }
        });
        responseDataHandler && responseDataHandler(d.list);
      }
    };
    if (queryCondition) {
      setData((prev) => {
        return {
          ...prev,
          list: !refreshState ? (prev ? [...prev.list] : []) : [],
          status: "loading",
        };
      });
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
    responseDataHandler,
    responseType,
    contentType,
    reFetchTrigger,
    refreshState,
  ]);
  return { data, setData };
}
