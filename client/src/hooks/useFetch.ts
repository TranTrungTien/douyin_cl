import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetch-data";

export function useFetch<T>(url: string, opts: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetchData<T>(url, opts)
      .then((data) => setData(data))
      .catch(alert);
  }, [url, opts]);

  return data;
}
