import { useEffect, useState } from "react";
import { getData, ResponseType } from "../services/app_services";

export function useFetchAppend<T1>(
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
    status: "loading" | "success" | "error";
    message?: string;
    list: T1[];
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData<{
        message: string;
        list: T1[];
      }>(url, params, withCredentials, responseType, contentType).catch(
        (err) => {
          setData((prev) => {
            return {
              list: [],
              status: "error",
              message: "Something went wrong",
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
      }
    };
    if (queryCondition) {
      setData((prev) => {
        return {
          ...prev,
          list: [],
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
    responseType,
    contentType,
  ]);
  return { data, setData };
}
