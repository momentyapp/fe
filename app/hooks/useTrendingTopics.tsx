import { useQuery } from "@tanstack/react-query";

import API from "~/apis";
import select from "~/utils/selectAPIResult";

/**
 * @description 실시간 트렌드 주제를 가져오는 훅
 */
export default function useTrendingTopics() {
  return useQuery({
    queryKey: ["trendingTopics"],
    refetchInterval: 1000 * 60 * 5,
    queryFn: async () => API.topic.getTrendingTopics(),
    select: (data) => select(data).topics,
  }).data;
}
