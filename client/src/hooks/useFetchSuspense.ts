import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetch-data";
import { promiseWrapper } from "../utils/promise-wrapper";

export function useFetchSuspense<T>(url: string, opts: AxiosRequestConfig) {
  const [resource, setResource] = useState<{
    read: () => undefined | T;
  } | null>(null);
  useEffect(() => {
    const _resource = promiseWrapper<T>(fetchData<T>(url, opts));
    setResource(_resource);
  }, [url, opts]);

  return resource?.read();
}
