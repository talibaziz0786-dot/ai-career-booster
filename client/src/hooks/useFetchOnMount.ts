import { useEffect, useState } from "react";

import { api } from "../lib/axios";

/**
 * Fetches a GET endpoint once on mount and exposes the selected payload.
 */
export function useFetchOnMount<
  TData,
  TPayload = unknown,
>(
  url: string,
  initialData: TData,
  select: (payload: TPayload) => TData
) {
  const [data, setData] =
    useState<TData>(initialData);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response =
          await api.get<TPayload>(url);

        if (active) {
          setData(select(response.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    data,
    loading,
  };
}
