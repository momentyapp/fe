import React, { createContext, useEffect, useState } from "react";
import API from "~/apis";

import type { Moment, Topic } from "common";

interface CacheValues {
  trendingTopics: Topic[];
  moments: Moment[];
}

interface CacheActions {
  setTrendingTopics: (trendingTopics: CacheValues["trendingTopics"]) => void;
  setMoments: (moments: CacheValues["moments"]) => void;
  addMoments: (moments: Moment[]) => void;
}

type Cache = CacheValues & CacheActions;

const defaultValue: Cache = {
  trendingTopics: [],
  moments: [],

  setTrendingTopics: () => {},
  setMoments: () => {},
  addMoments: () => {},
};

const CacheContext = createContext<Cache>(defaultValue);

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<CacheValues>(defaultValue);

  // 실시간 트렌드 주제 가져오기
  async function loadTrendingTopics() {
    const trendingTopics = await API.topic.getTrendingTopics();
    const { code, message, result } = trendingTopics.data;

    if (code === "success" && result !== undefined) {
      setCache((prev) => ({
        ...prev,
        trendingTopics: result.topics.map((topic) => ({
          id: topic.id,
          name: topic.name,
          trending: topic.trending,
          usage: topic.usage,
          enabled: true,
        })),
      }));
    }
  }

  useEffect(() => {
    loadTrendingTopics();
  }, []);

  return (
    <CacheContext.Provider
      value={{
        ...cache,
        // setTrendingTopics
        setTrendingTopics: (trendingTopics) =>
          setCache((prev) => ({ ...prev, trendingTopics })),

        // setMoments
        setMoments: (moments) => setCache((prev) => ({ ...prev, moments })),

        // addMoment
        addMoments: (moments) => {
          setCache((prev) => {
            const newMoments = moments.filter((moment) =>
              prev.moments.every((prevMoment) => prevMoment.id !== moment.id)
            );

            return {
              ...prev,
              moments: [...prev.moments, ...newMoments].sort(
                (a, b) => b.id - a.id
              ),
            };
          });
        },
      }}
    >
      {children}
    </CacheContext.Provider>
  );
}

export default CacheContext;
