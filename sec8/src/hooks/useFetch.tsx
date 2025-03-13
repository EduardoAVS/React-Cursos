import { useEffect, useState } from "react";

type FetchMethod = "POST" | "DELETE";

type FetchConfig = {
  method: FetchMethod;
  headers: HeadersInit;
  body?: string;
};

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [config, setConfig] = useState<FetchConfig | null>(null);
  const [method, setMethod] = useState<FetchMethod | null>(null);
  const [callFetch, setCallFetch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [itemId, setItemId] = useState<number | null>(null);

  const httpConfig = (data: unknown, method: FetchMethod) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod("POST");
    } else if (method === "DELETE" && typeof data === "number") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMethod("DELETE");
      setItemId(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (error) {
        setError("Houve um erro ao carregar os dados!");
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (!method || !config) return;
      setLoading(true);
      try {
        let fetchUrl = url;
        if (method === "DELETE" && itemId !== null) {
          fetchUrl = `${url}/${itemId}`;
        }
        const res = await fetch(fetchUrl, config);
        const json = await res.json();
        setCallFetch((prev) => !prev);
      } catch (error) {
        setError("Erro ao realizar requisição!");
      }
      setLoading(false);
    };
    httpRequest();
  }, [config]);

  return { data, httpConfig, loading, error };
};
