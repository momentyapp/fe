import type { Topic } from "common";
import { createContext, useEffect, useState } from "react";
import API from "~/apis";

interface CacheValues {
  trendingTopics: Topic[];
}

interface CacheActions {
  setTrendingTopics: (trendingTopics: CacheValues["trendingTopics"]) => void;
}

type Cache = CacheValues & CacheActions;

const defaultValue: Cache = {
  trendingTopics: [],

  setTrendingTopics: () => {},
};

const CacheContext = createContext<Cache>(defaultValue);

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<CacheValues>(defaultValue);

  // 실시간 트렌드 주제 가져오기
  useEffect(() => {
    (async () => {
      const trendingTopics = await API.topic.getTrendingTopics();
      const { code, message, result } = trendingTopics.data;

      if (code === "success" && result !== undefined) {
        setCache((prev) => ({
          ...prev,
          trendingTopics: result.topics.map((topic) => ({
            id: topic.id,
            name: topic.name,
            trending: topic.trending,
            count: topic.usage,
            enabled: true,
          })),
        }));
      }
    })();
  }, []);

  return (
    <CacheContext.Provider
      value={{
        ...cache,
        setTrendingTopics: (trendingTopics) =>
          setCache((prev) => ({ ...prev, trendingTopics })),
      }}
    >
      {children}
    </CacheContext.Provider>
  );
}

export default CacheContext;
