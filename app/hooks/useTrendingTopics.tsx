import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import API from "~/apis";
import useTopicStore from "~/contexts/useTopicStore";
import select from "~/utils/selectAPIResult";

/**
 * @description 주기적으로 실시간 트렌드 주제를 가져오는 훅
 */
export default function useTrendingTopics() {
  const topicStore = useTopicStore();

  const { data } = useQuery({
    queryKey: ["trendingTopics"],
    refetchInterval: 1000 * 60 * 5,
    queryFn: async () => API.topic.getTrendingTopics(),
    select,
  });

  useEffect(() => {
    if (data === undefined) return;
    topicStore.setTrending(data.topics);
  }, [data]);
}
