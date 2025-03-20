import { axiosInstance as axios } from "~/apis";
import type { ApiResponse } from "common";

export type GetTrendingTopicsResponse = ApiResponse<{
  count: number;
  topics: {
    id: number;
    name: string;
    trending?: boolean;
    usage?: number;
  }[];
}>;

export default async function getTrendingTopics(signal?: AbortSignal) {
  const result = await axios.get<GetTrendingTopicsResponse>("/topic/trend", {
    signal,
  });
  return result;
}
