import { useEffect } from "react";

import API from "~/apis";
import useTopicStore from "~/contexts/useTopicStore";

/**
 * @description 주기적으로 실시간 트렌드 주제를 가져오는 훅
 */
export default function useTrendingTopics() {
  const topicStore = useTopicStore();

  useEffect(() => {
    const interval = setInterval(() => {
      loadTrendingTopics().then((trendingTopics) => {
        if (trendingTopics === null) return;
        topicStore.setTrending(trendingTopics);
      });
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);
}

async function loadTrendingTopics() {
  const trendingTopics = await API.topic.getTrendingTopics();
  const { code, message, result } = trendingTopics.data;

  if (code === "success" && result !== undefined) {
    return result.topics;
  }

  return null;
}
